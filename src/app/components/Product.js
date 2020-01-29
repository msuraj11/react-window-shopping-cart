import React from "react";
import { VariableSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const columnWidths = index => {
  return index === 0 ? 80 : 150;
};

const headerGrid = React.createRef();

const HeaderRenderer = props => {
  const { columnIndex, style, data } = props;
  const updatedStyle = {
    ...style,
    padding: "5px 5px",
    display: "flex",
    flexDirection: "column",
    wordWrap: "break-word"
  };
  return <div style={updatedStyle}>{data[columnIndex]}</div>;
};

const Product = props => {
  const { list } = props;

  const itemSelected = item => {
    props.cartSelected(item);
  };

  const Cell = props => {
    const { data, rowIndex, columnIndex, style } = props;

    const dataObj = data[rowIndex];
    const objKeys = Object.keys(dataObj);
    const columnItem = objKeys[columnIndex];
    const renderItem =
      columnItem === "Action" ? (
        <button
          className="btn btn-outline-primary"
          onClick={() => itemSelected(data[rowIndex])}
        >
          Add to Wish-list
        </button>
      ) : (
        dataObj[columnItem]
      );
    //const renderItem = dataObj[columnItem];

    return (
      <div className="data-table-cell" style={style}>
        {renderItem}
      </div>
    );
  };

  return (
    <div>
      <br />
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search for..."
          onChange={props.handleInputChanged}
        />
      </form>

      <br />

      <div className="grid">
        {list.length > 0 && typeof list === "object" ? (
          <AutoSizer>
            {({ height, width }) => (
              <React.Fragment>
                <VariableSizeGrid
                  className="grid-header"
                  ref={headerGrid}
                  columnCount={Object.keys(list[0]).length + 1}
                  columnWidth={index => columnWidths(index)}
                  height={50}
                  rowCount={1}
                  rowHeight={() => 10}
                  width={width}
                  itemData={Object.keys(list[0])}
                  style={{
                    overflowX: "hidden",
                    overflowY: "hidden"
                  }}
                >
                  {HeaderRenderer}
                </VariableSizeGrid>
                <VariableSizeGrid
                  className="data-table-row"
                  columnCount={Object.keys(list[0]).length}
                  columnWidth={index => columnWidths(index)}
                  height={height}
                  rowCount={list.length}
                  rowHeight={() => 55}
                  width={width}
                  itemData={list}
                  onScroll={({ scrollLeft }) => {
                    headerGrid.current.scrollTo({ scrollLeft });
                  }}
                  //innerElementType={Cell}
                >
                  {Cell}
                </VariableSizeGrid>
              </React.Fragment>
            )}
          </AutoSizer>
        ) : (
          <h2>{list}</h2>
        )}
      </div>
    </div>
  );
};

export default Product;
