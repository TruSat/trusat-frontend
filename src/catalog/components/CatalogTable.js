import React, { useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../../app/components/Spinner";
import ObjectBadge from "../../app/components/ObjectBadge";
import {
  useTrusatGetApi,
  renderFlag,
  toolTip,
  shortenAddressToolTip,
  toolTipCopy
} from "../../app/app-helpers";
import TablePaginator from "../../app/components/TablePaginator";

export default function CatalogTable({ catalogFilter, range, setRange }) {
  const [{ data, isLoading, isError }, doFetch] = useTrusatGetApi();
  console.log(data);

  useEffect(() => {
    doFetch(`/catalog/${catalogFilter}`);
  }, [catalogFilter, doFetch]);

  const renderCatalogRows = () => {
    const { start, end } = range;

    const rangeData = data.slice(start, end);

    return rangeData.map(obj => (
      <tr
        key={data.indexOf(obj)}
        className="table__body-row catalog-table__body-row"
      >
        <td className="table__table-data">
          <NavLink
            className="app__nav-link"
            to={`/object/${obj.object_norad_number}`}
          >
            <div className="catalog-table__object-data-wrapper">
              {catalogFilter === "priorities" ? (
                <p
                  className="priorityRank"
                >
                  {data.indexOf(obj) + 1}
                  &nbsp;
                </p>
              ) : null}
              <ObjectBadge
                noradNumber={obj.object_norad_number}
                quality={obj.object_observation_quality}
              />
              <div
                className="objectNameWrapper"
              >
                {toolTip(obj.object_name, obj.object_norad_number)}
              </div>
            </div>
          </NavLink>
        </td>

        <td className="table__table-data">
          <NavLink
            className="app__nav-link"
            to={`/object/${obj.object_norad_number}`}
          >
            {renderFlag(obj.object_origin)}
          </NavLink>
        </td>

        <td className="table__table-data app__hide-on-mobile">
          <NavLink
            className="app__nav-link"
            to={`/object/${obj.object_norad_number}`}
          >
            {obj.object_primary_purpose}&nbsp;{obj.object_secondary_purpose}
          </NavLink>
        </td>
        <td className="table__table-data app__hide-on-mobile">
          <NavLink
            className="app__nav-link"
            to={`/object/${obj.object_norad_number}`}
          >
            {obj.object_observation_quality}%
          </NavLink>
        </td>
        <td className="table__table-data usernameWrapper">
          <NavLink
            className="app__nav-link"
            to={`/profile/${obj.address_last_tracked}`}
          >
            {obj.username_last_tracked
              ? toolTip(obj.username_last_tracked, obj.address_last_tracked)
              : shortenAddressToolTip(obj.address_last_tracked)}
          </NavLink>
        </td>
      </tr>
    ));
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      {isError ? (
        <p className="app__error-message">Something went wrong ...</p>
      ) : (
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
              <th className="table__header-text usernameWrapper">
                {toolTip("LAST SEEN BY", toolTipCopy.last_seen_by)}
              </th>
            </tr>
          </thead>
          <tbody className="table__body">{renderCatalogRows()}</tbody>
        </table>
      )}
      {data.length > 10 ? (
        <TablePaginator
          tableDataLength={data.length}
          range={range}
          setRange={setRange}
        />
      ) : null}
    </Fragment>
  );
}
