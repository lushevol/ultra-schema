import type { ColumnType } from 'antd/es/table';
import type { PanelMetricData, PanelTableData } from '../types/panel-types';

export function exportTableDataToCSV(
  data: PanelTableData,
  filename = 'table',
): void {
  const csvRows: string[] = [];

  // Add headers
  const headers: string[] = data.columns
    ? data.columns
        .map((i) => `${(i as ColumnType).key}`)
        .filter((i): i is string => !!i)
    : Object.keys(data.rows.at(0) ?? {});
  const headersTitle = headers.map((i) => {
    if (data.columns) {
      const column = data.columns.find((j) => `${(j as ColumnType).key}` === i);
      return column ? column.title : i;
    }

    return i;
  });
  csvRows.push(headersTitle.join(','));

  // Add rows
  for (const row of data.rows) {
    const values = headers.map((header) => {
      const escaped = `${row[header]}`.replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  // Create CSV string
  const csvString = csvRows.join('\n');

  exportRawDataToCSV(csvString, filename);
}

export function exportMetricsDataToCSV(
  data: PanelMetricData,
  filename = 'metrics',
): void {
  const csvRows: string[] = [];

  // Add headers
  const headers: Array<keyof PanelMetricData> = ['value', 'unit', 'subTitle'];
  csvRows.push(headers.join(','));

  // Add rows
  const values = headers.map((header) => {
    const escaped = `${data[header]}`.replace(/"/g, '\\"');
    return `"${escaped}"`;
  });
  csvRows.push(values.join(','));

  // Create CSV string
  const csvString = csvRows.join('\n');

  exportRawDataToCSV(csvString, filename);
}

const exportRawDataToCSV = (csvData: string, filename = 'dashboard-export') => {
  // Create a Blob from the CSV string
  const blob = new Blob([csvData], { type: 'text/csv' });

  // Create a link element
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;

  // Append the link to the document body and click it to trigger the download
  document.body.appendChild(link);
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};
