using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using System.IO;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace TranslationHubFunctionApp
{
	public static class Translations
	{
		[FunctionName("negotiate")]
		public static SignalRConnectionInfo Negotiate(
			[HttpTrigger(AuthorizationLevel.Anonymous)] HttpRequest req,
			[SignalRConnectionInfo(HubName = "translations")] SignalRConnectionInfo connectionInfo)
		{
			return connectionInfo;
		}

		[FunctionName("translations")]
		public static async Task<IActionResult> Run(
			[HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequest req,
			[SignalR(HubName = "translations")] IAsyncCollector<SignalRMessage> translations,
			ILogger log)
		{
			log.LogInformation("C# HTTP trigger function processed a request.");

			var body = await new StreamReader(req.Body).ReadToEndAsync();
			var payload = JsonConvert.DeserializeObject<Dictionary<string, string>>(body);

			foreach (var item in payload)
			{
				var message = new SignalRMessage
				{
					Target = item.Key,
					Arguments = new[] { item.Value }
				};

				await translations.AddAsync(message);
			}

			return new OkResult();
		}
	}
}
