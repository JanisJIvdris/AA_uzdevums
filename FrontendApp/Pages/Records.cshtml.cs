using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace FrontendApp.Pages
{
    public class RecordsModel : PageModel
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<RecordsModel> _logger;

        public RecordsModel(HttpClient httpClient, ILogger<RecordsModel> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public List<Record> Records { get; set; } = new List<Record>();

        public async Task OnGet()
        {
            try
            {
                // Fetch records from the API
                var response = await _httpClient.GetAsync("https://localhost:7112/api/Records");
                response.EnsureSuccessStatusCode();
                var responseContent = await response.Content.ReadAsStringAsync();
                Records = JsonSerializer.Deserialize<List<Record>>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                _logger.LogInformation("Fetched records: {@Records}", Records);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching records from API");
            }
        }
    }

    public class Record
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
