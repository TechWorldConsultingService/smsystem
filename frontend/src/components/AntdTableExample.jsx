"use client";

import React, { useState, useEffect } from 'react';
import { Table, Input, Checkbox, Popover, Tag, Select } from 'antd';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { MenuFoldOutlined } from '@ant-design/icons';
import * as XLSX from "xlsx";
const { Search } = Input;

const AntdTableExample = ({
  dataSource = [], // Default to empty array if not provided
  onRowClick,
  actions,
  showColumnFilter,
  onSelectedRowKeysChange,
  rowKey,
  displayDoc,
  hideCol,
  initialSelectedRowKeys,
  showCheckbox,
  globalSearch,
  tagColumns,
  colSearch,
  customDropDownFilter,
  onFilterIconClick,
  filterIcon
}) => {
  const [tableData, setTableData] = useState(dataSource);
  const [initialData, setInitialData] = useState(dataSource);
  const [value, setValue] = useState('');
  const [filterData, setTableDataFilter] = useState([]);
  const [placeholder, setPlaceholder] = useState('Search');
  const colInputData = Array.isArray(dataSource) && dataSource.length > 0 ? dataSource[0] : {};
  const [selectedRowKeys, setSelectedRowKeys] = useState(initialSelectedRowKeys || []);
  const [selectedRows, setSelectedRows] = useState([]);
  const [columnFilters, setColumnFilters] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState([]);

  useEffect(() => {
    // Extract unique status values from dataSource
    const statusOptions = Array.from(new Set(dataSource.map(entry => entry.Status)));
    setDropdownOptions(statusOptions);
  }, [dataSource]);

  useEffect(() => {
    setTableData(dataSource); // Update tableData when dataSource changes
    setInitialData(dataSource);
  }, [dataSource]);

  useEffect(() => {
    if (initialSelectedRowKeys) {
      setSelectedRowKeys(initialSelectedRowKeys);
    }
  }, [initialSelectedRowKeys]);

  useEffect(() => {
    if (initialData.length > 0) {
      const firstKey = Object.keys(initialData[0])[0];
      setPlaceholder(`Search ${firstKey}`);
    }
  }, [initialData]);

  useEffect(() => {
    if (onSelectedRowKeysChange) {
      onSelectedRowKeysChange(selectedRowKeys, selectedRows);
    }
  }, [selectedRowKeys, selectedRows, onSelectedRowKeysChange]);

  const capitalizeFirstLetter = (key) => {
    if (!key) return '';
    const formattedKey = key.replace(/([a-z])([A-Z])/g, '$1 $2');
    return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
  };

  const renderTag = (text, column) => {
    if (tagColumns && tagColumns[column]) {
      const { colorMap, defaultColor } = tagColumns[column];
      const color = colorMap[text] || defaultColor;
      return <Tag color={color}>{text}</Tag>;
    }
    return text;
  };

  const handleDropdownChange = (value, key) => {
    if (value === undefined) {
      setInitialData(dataSource);
      setDropdownOptions([]);
      return;
    }
    const statusOptions = dataSource.reduce((options, record) => {
      const statusValue = record[key];
      if (statusValue && !options.includes(statusValue)) {
        options.push(statusValue);
      }
      return options;
    }, []);

    const filteredData = dataSource.filter(entry =>
      entry[key] && entry[key].toLowerCase() === value.toLowerCase()
    );

    setInitialData(filteredData);
    setDropdownOptions(statusOptions);
  };

  const handleClearSelection = () => {
    setTableData(dataSource);
  };

  const columnFilter = Array.isArray(dataSource) && dataSource.length > 0
    ? Object.keys(dataSource[0])
        .filter(key => !["id", "ID", "Id", "Guid", "GUID", "guid"].includes(key) && !hideCol.split(',').map(h => h.trim().toLowerCase()).includes(key.toLowerCase()))
        .map(key => ({
          title: capitalizeFirstLetter(key),
          render: (data, record) => renderTag(data, key),
          dataIndex: key,
          key: key,
        }))
    : [];

  const columns = Array.isArray(dataSource) && dataSource.length > 0
    ? Object.keys(dataSource[0])
        .filter(key => !["id", "ID", "Id", "Guid", "GUID", "guid"].includes(key) && !hideCol.split(',').map(h => h.trim().toLowerCase()).includes(key.toLowerCase()))
        .map(key => {
          const isStatusOrRequestTypeColumn = customDropDownFilter?.includes(key);

          return {
            title: (
              <div>
                <div>{capitalizeFirstLetter(key)}</div>
                <div>
                  {colSearch && !isStatusOrRequestTypeColumn && (
                    <Input
                      placeholder={`Search ${capitalizeFirstLetter(key)}`}
                      onChange={(e) => handleSearch(e.target.value, key)}
                      style={{ width: 120, marginTop: 8 }}
                    />
                  )}
                  {isStatusOrRequestTypeColumn && (
                    <Select
                      placeholder={`Select ${capitalizeFirstLetter(key)}`}
                      onChange={(value) => handleDropdownChange(value, key)}
                      style={{ width: 120, marginTop: 8 }}
                      showSearch
                      allowClear
                      onClear={() => handleClearSelection()}
                    >
                      {dataSource.map(record => record[key]).filter((value, index, self) => self.indexOf(value) === index).map((value, index) => (
                        <Select.Option key={index} value={value}>{value}</Select.Option>
                      ))}
                    </Select>
                  )}
                </div>
              </div>
            ),
            render: (data, record) => renderTag(data, key),
            dataIndex: key,
            key: key,
          };
        })
    : [];

  // Handle search logic
  const handleSearch = (searchValue, key) => {
    const filteredData = dataSource.filter(entry =>
      entry[key] && entry[key].toString().toLowerCase().includes(searchValue.toLowerCase())
    );
    setInitialData(filteredData);
  };

  // Additional logic for actions column
  if (actions && Array.isArray(dataSource) && dataSource.length > 0 && Object.keys(dataSource[0]).length > 0) {
    columns.push({
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span style={{ display: 'flex' }}>
          {actions.map(action => (
            <div style={{ marginRight: "10px" }} title={action.key} key={action.key} onClick={(e) => action.onClick(e, record)}>
              <img width={action.iconSize ? action.iconSize : "20"} src={action.icon} />
            </div>
          ))}
        </span>
      ),
    });
  }

  let extendedTableData = [];
  if (showColumnFilter) {
    extendedTableData = [
      Object.fromEntries(
        Object.keys(colInputData).map(data => [
          data,
          <Input
            key={data}
            placeholder={'Search ' + data}
            value={value[data] || ''}
            onChange={e => {
              const currValue = e.target.value;
              setValue(prevState => ({
                ...prevState,
                [data]: currValue,
              }));
              const filteredData = dataSource.filter(entry =>
                entry[data] && entry[data].toLowerCase().includes(currValue.toLowerCase())
              );
              setTableData(filteredData);
            }}
          />
        ])
      ),
      ...tableData
    ];
  } else {
    extendedTableData = initialData;
  }

  const onSearch = (value, _e, info) => {
    const searchVal = value.target.value.toLowerCase();
    const filteredData = dataSource.filter(entry =>
      Object.values(entry).some(val => typeof val === 'string' && val.toLowerCase().includes(searchVal))
    );
    setInitialData(filteredData)
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const visibleColumns = newColumnsFiles.filter(column => !column.hidden);
    
    doc.autoTable({
      head: [visibleColumns.map(col => col.title)],
      body: tableData.map(row => visibleColumns.map(col => row[col.dataIndex])),
    });
    doc.save('table.pdf');
  };

  const exportToCSV = () => {
    const visibleColumns = newColumnsFiles.filter(column => !column.hidden);
    const csvData = [visibleColumns.map(col => col.title), ...tableData.map(row => visibleColumns.map(col => row[col.dataIndex]))];
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'table.csv');
    document.body.appendChild(link);
    link.click();
  };

  const exportToXLSX = () => {
    const visibleColumns = newColumnsFiles.filter(column => !column.hidden);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(tableData.map(row => visibleColumns.reduce((acc, col) => {
      acc[col.title] = row[col.dataIndex];
      return acc;
    }, {})));
    XLSX.utils.book_append_sheet(wb, ws, 'Table Data');
    XLSX.writeFile(wb, 'table.xlsx');
  };

  return (
    <>
      {globalSearch && (
        <Input
          style={{ marginBottom: 10 }}
          placeholder={placeholder}
          onChange={(e) => onSearch(e)}
        />
      )}
      <Table
        onRow={(record) => ({
          onClick: () => onRowClick && onRowClick(record)
        })}
        rowSelection={showCheckbox ? {
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
          }
        } : undefined}
        dataSource={extendedTableData}
        columns={showColumnFilter ? columnFilter : columns}
        rowKey={rowKey}
      />
      {displayDoc && (
        <Popover
          title="Documents"
          content={
            <div>
              <p onClick={exportToCSV} style={{ cursor: "pointer" }}>Export CSV</p>
              <p onClick={exportToPDF} style={{ cursor: "pointer" }}>Export PDF</p>
              <p onClick={exportToXLSX} style={{ cursor: "pointer" }}>Export XLSX</p>
            </div>
          }
        >
          <MenuFoldOutlined />
        </Popover>
      )}
    </>
  );
};

export default AntdTableExample;
