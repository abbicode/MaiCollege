const fetchCollegeData = async () => {
  const url = "https://api.data.gov/ed/collegescorecard/v1/schools";
  const apiKey = "vcWEZiScp9Sl90Iw278yRaqSScBRJtnvzbfxiH7y"; // Replace with your actual API key
  const fields = "id,school,latest";
  const perPage = 100; // Maximum allowed by the API

  try {
    // Fetch first page to get total count
    const response = await fetch(`${url}?api_key=${apiKey}&fields=${fields}&per_page=${perPage}&page=0`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.results.length} colleges from page 0. Total available: ${data.metadata.total}`);

    // If there are more pages, fetch them all
    const totalPages = Math.ceil(data.metadata.total / perPage);
    const allResults = [...data.results];

    // Fetch remaining pages (limit to first 10 pages = 1000 schools to avoid long load times)
    const maxPages = Math.min(totalPages, 20);

    // Todo: figure out what info we want to query to help us with fields, also maybe fetch more than latest.college.name. Trim fields line. 

    for (let page = 1; page < maxPages; page++) {
      const pageResponse = await fetch(`${url}?api_key=${apiKey}&fields=${fields}&per_page=${perPage}&page=${page}`);
      if (pageResponse.ok) {
        const pageData = await pageResponse.json();
        allResults.push(...pageData.results);
        console.log(`Fetched page ${page}, total colleges: ${allResults.length}`);
      }
    }

    console.log(`Total colleges fetched: ${allResults.length}`);
    return { ...data, results: allResults };
  } catch (error) {
    console.error("Error fetching college data:", error);
  }
};
module.exports = { fetchCollegeData };

// latest.cost.avg_net_price.overall
// "latest.student.FAFSA_applications":
// latest.student.demographics.women