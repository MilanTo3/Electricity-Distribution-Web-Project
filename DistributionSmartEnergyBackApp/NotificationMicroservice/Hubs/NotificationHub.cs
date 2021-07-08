using NotificationMicroservice.Models.EntityModels;
using NotificationMicroservice.Models.Interfaces;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NotificationMicroservice.Hubs
{

    public  class NotificationHub : Hub
    {
        private static IHubContext<NotificationHub> hubContext;
        public  NotificationHub(IHubContext<NotificationHub> hub)
        {
            hubContext = hub;
        }
        public static void Notify(NotificationModel notification)
        {
            hubContext.Clients.All.SendAsync("notif", notification);
        }

        //public override Task OnConnectedAsync()
        //{
        //    hubContext.Groups.AddToGroupAsync(Context.ConnectionId, "Admins");
      
        //    return base.OnConnectedAsync();
        //}

        //    public NotificationHub(DbContext db)
        //    {
        //        this.db = db;
        //    }

        //    public void Hello()
        //    {
        //        Clients.All.hello("Hello from server");
        //    }

        //    public static void Notify(int clickCount)
        //    {
        //        hubContext.Clients.Group("Admins").clickNotification($"Clicks: {clickCount}");
        //    }

        //    public void GetTime()
        //    {
        //        Clients.All.setRealTime(DateTime.Now.ToString("h:mm:ss tt"));
        //    }

        //    public void TimeServerUpdates()
        //    {
        //        t.Interval = 1000;
        //        t.Start();
        //        t.Elapsed += OnTimedEvent;
        //    }

        //    private void OnTimedEvent(object source, ElapsedEventArgs e)
        //    {
        //        GetTime();
        //    }

        //    public void StopTimeServerUpdates()
        //    {
        //        t.Stop();
        //    }



        //    public override Task OnDisconnected(bool stopCalled)
        //    {
        //        Groups.Remove(Context.ConnectionId, "Admins");

        //        //if (Context.User.IsInRole("Admin"))
        //        //{
        //        //    Groups.Remove(Context.ConnectionId, "Admins");
        //        //}

        //        return base.OnDisconnected(stopCalled);
        //    }
        //
    }
}
