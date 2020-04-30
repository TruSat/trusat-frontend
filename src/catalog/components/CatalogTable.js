import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import ObjectBadge from "../../app/components/ObjectBadge";
import { renderFlag, toolTip, toolTipCopy } from "../../app/app-helpers";
import TablePaginator from "../../app/components/TablePaginator";

export default function CatalogTable({
  catalogFilter,
  catalogObjects,
  range,
  setRange,
  dataStart,
  setDataStart,
}) {
  const renderCatalogRows = () => {
    // Render rows if data is returned (some filters may not return any data)
    if (catalogObjects.length !== 0) {
      // get current range as determined by the TablePaginator component
      const { start, end } = range;
      // get the data to be displayed using the range
      const rangeData = catalogObjects.slice(start, end);

      return rangeData.map((obj) => (
        <tr
          key={catalogObjects.indexOf(obj)}
          className="table__body-row catalog-table__body-row"
        >
          <td className="table__table-data table__table-data--big_rows">
            <NavLink
              className="app__nav-link"
              to={`/object/${obj.object_norad_number}`}
            >
              <div className="catalog-table__object-data-wrapper">
                {catalogFilter === "priorities" ? (
                  <p className="catalog-table__object-data-wrapper--priority-rank">
                    {dataStart + catalogObjects.indexOf(obj) + 1}
                    &nbsp;
                  </p>
                ) : null}
                <ObjectBadge
                  noradNumber={obj.object_norad_number}
                  size={"small"}
                />
                &nbsp;
                <div className="catalog-table__object-data-wrapper--object-name">
                  {obj.object_name}
                </div>
              </div>
            </NavLink>
          </td>

          <td className="table__table-data catalog-table__table-data--origin-wrapper">
            <NavLink
              className="app__nav-link"
              to={`/object/${obj.object_norad_number}`}
            >
              {renderFlag(obj.object_origin)}
            </NavLink>
          </td>

          <td className="table__table-data app__hide-on-mobile catalog-table__table-data--purpose-wrapper">
            <NavLink
              className="app__nav-link"
              to={`/object/${obj.object_norad_number}`}
            >
              {obj.object_merged_description}
            </NavLink>
          </td>
          <td className="table__table-data app__hide-on-mobile">
            <NavLink
              className="app__nav-link"
              to={`/object/${obj.object_norad_number}`}
            >
              {/* {obj.object_observation_quality}% */}
              TBD
            </NavLink>
          </td>
          <td className="table__table-data catalog-table__table-data--username-wrapper">
            <NavLink
              className="app__nav-link"
              to={`/profile/${obj.address_last_tracked}`}
            >
              {toolTip(obj.username_last_tracked, obj.address_last_tracked)}
            </NavLink>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div>
      {catalogObjects.length !== 0 ? (
        <table className="table">
          <thead className="table__header">
            <tr className="table__header-row">
              <th className="table__header-text">
                {toolTip("OBJECT", toolTipCopy.object)}
              </th>
              <th className="table__header-text">
                {toolTip("ORIGIN", toolTipCopy.origin)}
              </th>
              <th className="table__header-text app__hide-on-mobile">
                {toolTip("PURPOSE", toolTipCopy.purpose)}
              </th>
              <th className="table__header-text app__hide-on-mobile">
                {toolTip("CONFIDENCE", toolTipCopy.confidence)}
              </th>
              <th className="table__header-text catalog-table__table-data--username-wrapper">
                {toolTip("LAST SEEN BY", toolTipCopy.last_seen_by)}
              </th>
            </tr>
          </thead>
          <tbody className="table__body">{renderCatalogRows()}</tbody>
        </table>
      ) : (
        <p className="app__error-message">
          The catalog does not currently include any objects that match the
          filter chosen
        </p>
      )}

      {catalogObjects.length > 10 ? (
        <TablePaginator
          tableDataLength={catalogObjects.length}
          range={range}
          setRange={setRange}
          dataStart={dataStart}
          setDataStart={setDataStart}
        />
      ) : null}
    </div>
  );
}
