using Microsoft.EntityFrameworkCore.Migrations;

namespace DistributionSmartEnergyBackApp.Migrations
{
    public partial class ah : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WorkPlanId",
                table: "BasicInformationSD",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkPlanId",
                table: "BasicInformationSD");
        }
    }
}
