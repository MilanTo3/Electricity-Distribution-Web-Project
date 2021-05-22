using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DistributionSmartEnergyBackApp.Models
{
    public class UserModel
    {

        private string name;
        private string lastname;
        private string username;
        private string password;
        private string email;
        private DateTime birthday;
        private string address;
        private string userType;
        private IFormFile filePicture;
        private string team;
        private string phoneNumber;

        public UserModel() {

        }

        public UserModel(string name, string lastname, string username, string password) {

            this.name = name;
            this.lastname = lastname;
            this.username = username;
            this.password = password;

        }

        public string Name {

            get { return name; }
            set { name = value; }
        }

        public string Lastname {

            get { return lastname; }
            set { lastname = value; }
        }

        public string UserName {
            get { return username; }
            set { username = value; }
        }

        public string Password {

            get { return password; }
            set { password = value; }
        }

        public string Email {

            get { return email; }
            set { email = value; }
        }

        public DateTime Birthday {

            get { return birthday; }
            set { birthday = value; }
        }

        public string Address {

            get { return address; }
            set { address = value; }
        }

        public string UserType {

            get { return userType; }
            set { userType = value; }
        }

        public IFormFile FilePicture {

            get { return filePicture; }
            set { filePicture = value; }
        }

        public string TeamId {

            get { return team; }
            set { team = value; }
        }

        public string PhoneNumber {

            get { return phoneNumber; }
            set { phoneNumber = value;}
        }

    }
}
