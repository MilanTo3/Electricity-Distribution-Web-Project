#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["DistributionSmartEnergyBackApp/DistributionSmartEnergyBackApp.csproj", "DistributionSmartEnergyBackApp/"]
RUN dotnet restore "DistributionSmartEnergyBackApp/DistributionSmartEnergyBackApp.csproj"
COPY . .
WORKDIR "/src/DistributionSmartEnergyBackApp"
RUN dotnet build "DistributionSmartEnergyBackApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DistributionSmartEnergyBackApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DistributionSmartEnergyBackApp.dll"]