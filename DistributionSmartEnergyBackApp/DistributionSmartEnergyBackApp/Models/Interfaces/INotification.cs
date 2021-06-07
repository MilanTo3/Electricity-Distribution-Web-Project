using DistributionSmartEnergyBackApp.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models.Interfaces
{
    public interface INotification
    {
        Task<NotificationModel> GetNotification(int id);
        Task AddNotification(NotificationModel notification);

        Task DeleteNotification(int id);

        Task<IEnumerable<NotificationModel>> GetNotifications();

        Task<IEnumerable<NotificationModel>> GetUserNotif(string username);

        Task MarkAsSeen(string username);

        Task ClearAllNotifications(string username);

        Task <IEnumerable<NotificationModel>> GetUnreadNotifications(string username);


    }
}
