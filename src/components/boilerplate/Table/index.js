import React from "react";
import classNames from "~/utils/classnames";
import { withRefs } from "~/utils/refs";

import "./style.scss";

const useColumns = ({
    columns,
    HeadCellComponent,
    th,
    centerHeaders,
    sth
}) => React.useMemo(() => {
    return columns.map((col, i) => {
        if(typeof col === "undefined")
            return null;

        if(typeof col === "string") {
            return (
                <HeadCellComponent key={`table-th-${i}-${col}`}
                    className={classNames("th", th, centerHeaders && "text-center")}
                    children={col} style={sth} />
            );
        }

        if(col.hidden)
            return null;

        let { className, label, key } = col;

        let children = label;

        return (
            <HeadCellComponent key={key || `table-th-${i}-${col}`}
                className={classNames("th", centerHeaders && "text-center", th, className)}
                children={children} style={sth} />
        );
    });
}, [ columns, HeadCellComponent, th, centerHeaders, sth ]);

/**
 * Example use:
 *
 * <Table columns={[
 *      "Date",
 *      "Service",
 *      "Price"
 * ]}>
 *      <tr>
 *          <td>06/04/1999</td>
 *          <td>Service Name</td>
 *          <td>$0.00</td>
 *      </tr>
 *      <tr>
 *          <td>06/04/1999</td>
 *          <td>Service Name</td>
 *          <td>$0.00</td>
 *      </tr>
 * </Table>
 */

// Convenience component for the material-table style set
export default React.forwardRef(({
    className,
    stickyHeader,
    stickMode,
    highlightOnFocus,
    columns = [],
    centerHeaders,
    children,
    header,
    tableRef,
    tableProps = {},
    headProps = {},
    bodyProps = {},

    tableComponent: TableComponent = "table",
    bodyComponent: BodyComponent = "tbody",
    headComponent: HeadComponent = "thead",
    headRowComponent: HeadRowComponent = "tr",
    headCellComponent: HeadCellComponent = "th",

    classes: { table, thead, tr, th, tbody } = {},
    styles: { table: stable, thead: sthead, tr: str, th: sth, tbody: stbody } = {},
    ...props
}, ref) => {
    let cols = useColumns({ columns, HeadCellComponent, th, centerHeaders, sth });

    return (
        <TableComponent {...tableProps} {...props}
            className={classNames("material-table", table, stickyHeader && "sticky-header", stickMode, highlightOnFocus && "highlight-on-focus", className)}
            ref={withRefs(ref, tableRef)} style={{ ...tableProps.style, ...stable }}>
            <HeadComponent {...headProps} className={classNames("thead", thead, headProps.className)} style={{ ...headProps.style, ...sthead }}>
                <HeadRowComponent className={classNames("tr", tr)} style={str}>
                    {cols}
                    {header}
                </HeadRowComponent>
            </HeadComponent>
            <BodyComponent {...bodyProps} className={classNames("tbody", bodyProps.className, tbody)} style={{ ...bodyProps.style, ...stbody }}>
                {children}
            </BodyComponent>
        </TableComponent>
    );
});
