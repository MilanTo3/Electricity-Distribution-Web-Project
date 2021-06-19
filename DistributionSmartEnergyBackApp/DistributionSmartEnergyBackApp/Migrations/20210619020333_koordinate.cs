using Microsoft.EntityFrameworkCore.Migrations;

namespace DistributionSmartEnergyBackApp.Migrations
{
    public partial class koordinate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Coordinates",
                table: "Devices");

            migrationBuilder.AddColumn<long>(
                name: "Latitude",
                table: "Devices",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Longitude",
                table: "Devices",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Devices");

            migrationBuilder.AddColumn<string>(
                name: "Coordinates",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
