using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NotificationMicroservice.Migrations
{
    public partial class notification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Seen = table.Column<bool>(type: "bit", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DocumentId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InfoCheck = table.Column<bool>(type: "bit", nullable: false),
                    WarningCheck = table.Column<bool>(type: "bit", nullable: false),
                    SuccessCheck = table.Column<bool>(type: "bit", nullable: false),
                    ErrorCheck = table.Column<bool>(type: "bit", nullable: false),
                    MandatoryCheck = table.Column<bool>(type: "bit", nullable: false),
                    ResetCheck = table.Column<bool>(type: "bit", nullable: false),
                    IconCall = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IconCrew = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IconIncident = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "Settings");
        }
    }
}
