/**
 * Accumulation charts Enum file
 */

export type AccumulationType = 'Pie';
/** 
 * Defines the AccumulationLabelPosition. They are
 * * Inside - Define the data label position for the accumulation series Inside.
 * * Outside - Define the data label position for the accumulation series Outside.
 * * 
 */
export type AccumulationLabelPosition =
    /** Define the data label position for the accumulation series Inside */
    'Inside' |
    /** Define the data label position for the accumulation series Outside */
    'Outside';

/** 
 * Defines the ConnectorType. They are
 * * Line - Accumulation series Connector line type as Straight line.
 * * Curve - Accumulation series Connector line type as Curved line.
 * * 
 */
export type ConnectorType =
    /** Accumulation series Connector line type as Straight line */
    'Line' |
     /** Accumulation series Connector line type as Curved line */
    'Curve';
/** 
 * Defines the SelectionMode, They are.
 * * none - Disable the selection.
 * * point - To select a point.
 */
export type AccumulationSelectionMode =
    /** Disable the selection. */
    'None' |
    /** To select a point. */
    'Point';
/** 
 * Defines Theme of the accumulation chart. They are
 * * Material - Render a accumulation chart with Material theme.
 * * Fabric - Render a accumulation chart with fabric theme.
 */
export type AccumulationTheme =
    /**  Render a accumulation chart with Material theme. */
    'Material'|
    /**  Render a accumulation chart with Fabric theme. */
    'Fabric';