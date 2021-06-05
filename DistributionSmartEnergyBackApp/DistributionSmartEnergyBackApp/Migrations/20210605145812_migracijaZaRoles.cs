using Microsoft.EntityFrameworkCore.Migrations;

namespace DistributionSmartEnergyBackApp.Migrations
{
    public partial class migracijaZaRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RoleRequest",
                table: "AspNetUsers",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoleRequest",
                table: "AspNetUsers");
        }
    }
}
