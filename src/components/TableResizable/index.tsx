import React from 'react';
import { Resizable } from 'react-resizable';

class TableResizable extends React.Component {
  static ResizableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
      return <th {...restProps} />;
    }

    return (
      <Resizable
        width={width}
        height={0}
        handle={
          <span
            className="react-resizable-handle"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        }
        onResize={onResize}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <th {...restProps} />
      </Resizable>
    );
  };

  static components = {
    header: {
      cell: TableResizable.ResizableTitle,
    },
  };
}

export default TableResizable;
