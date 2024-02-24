# Fetching Interest News and Storing Them in Google Drive
This repository is designed for marketing and communication experts who need to efficiently manage news about their clients without requiring extensive data management knowledge. You only need to have a Google account and basic Excel skills to get started.

## Target Audience
Aimed at community managers, marketing, and communication experts from medium and small-sized agencies seeking some independence in the process of obtaining and analyzing news.

## Features
- **Fetching News and Opinions**: Connects with the ETL provider TrawlingWeb to retrieve news about companies, brands, or topics of interest for your clients and your strategies.
- **Management from Google**: Stores the results in folders and files within Google Drive, facilitating their access and processing.
- **Apps Script**: Uses this Google tool to run the entire process in a few minutes, in a simple and efficient way.

## How to Use
Follow these steps to use the connectors in this repository:

1. Sign up with the ETL news provider at TrawlingWeb.
2. Access Google Apps Script and prepare to copy and paste the provided code.
3. In Google Drive, create a folder with the name of your choice that can easily identify with your client or topic of interest.
4. Inside this folder, create another one called `RAW`.
5. Select the `TRW_NewsMedia2CSV` script available in this repository. Inside, you will find useful comments (starting with `//`) to obtain the necessary Token key and how to use specific search terms.
6. Create a new project in Google Apps Script, name it as you wish, copy the script code, save it, and run it. This will store the news in your Google Drive folder in CSV format.
7. Without closing the created project, open a new project in Google Apps Script for the `TRW_CSV2SpreadSheet` script, copy it, paste it, save it, and run it. This will convert the CSVs into spreadsheets to facilitate their management.

### Notes
- At the end, you will have two projects in Apps Script: one that stores the news in CSV and another that updates them in a spreadsheet, all within the created folder in Google Drive.
- Consider using the "Triggers" function in each project to run the scripts automatically every 12 or 24 hours, thus automating the entire process.

### Prerequisites
- A Google account (personal or professional).
- Basic knowledge of Google Drive.
- A free account at TrawlingWeb.

## What are ETLs?
ETL stands for Extract, Transform, Load, a process that describes taking data from one or more sources, transforming it to meet certain criteria or formats, and then loading it into a target system for analysis or storage. The solutions in this repository are designed to facilitate these tasks with various data sources, simplifying data management and allowing you to access valuable information quickly and efficiently.

## About TrawlingWeb
TrawlingWeb is a company specializing in data and content capture, offering you access to content captured in real time, including news from 18 million information sources and conversations on social networks. We provide the necessary tools so that relevant information is always at your disposal, optimizing your analysis strategies and decision-making.
