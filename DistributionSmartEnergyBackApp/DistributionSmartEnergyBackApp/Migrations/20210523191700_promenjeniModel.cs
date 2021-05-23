using Microsoft.EntityFrameworkCore.Migrations;

namespace DistributionSmartEnergyBackApp.Migrations
{
    public partial class promenjeniModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Street",
                table: "BasicInformationsWP");

            migrationBuilder.AddColumn<long>(
                name: "LocationId",
                table: "Calls",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "locationId",
                table: "BasicInformationsWP",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "Calls");

            migrationBuilder.DropColumn(
                name: "locationId",
                table: "BasicInformationsWP");

            migrationBuilder.AddColumn<string>(
                name: "Street",
                table: "BasicInformationsWP",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
