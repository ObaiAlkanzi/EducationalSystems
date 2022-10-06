using Microsoft.AspNetCore.SignalR;

namespace EducationalSystem.Hubs
{
    public class FirstHub:Hub
    {
        public async Task SendMessage(string username,string message)
        {
            await Clients.All.SendAsync("ReseciveMessage",username,message);
        }

        public override async Task OnConnectedAsync()
        {
            //await Clients.All.SendAsync("UserConnected",Context.ConnectionId);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.All.SendAsync("UserDisconnected",Context.ConnectionId);
            await base.OnDisconnectedAsync(ex);
        }

        public async Task UserConnected(int userId)
        {
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId, userId);
        }
    }
}
