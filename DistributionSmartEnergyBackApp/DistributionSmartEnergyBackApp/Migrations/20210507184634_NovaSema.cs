using Microsoft.EntityFrameworkCore.Migrations;

namespace DistributionSmartEnergyBackApp.Migrations
{
    public partial class NovaSema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Teams",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Teams",
                table: "AspNetUsers");
        }
    }
}
