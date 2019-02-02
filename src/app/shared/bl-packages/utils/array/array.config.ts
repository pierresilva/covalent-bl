export interface ArrayConfig {
  /** Depth item name, default: `'deep'` */
  deepMapName?: string;
  /** The parent data item name of the flat array, default: `'parent'` */
  parentMapName?: string;
  /** Number item name, default: `'id'` */
  idMapName?: string;
  /** Parent number item name, default: `'parent_id'` */
  parentIdMapName?: string;
  /** Source data subkey name, default: `'children'` */
  childrenMapName?: string;
  /** Title item name, default: `'title'` */
  titleMapName?: string;
  /** Whether the node Checkbox selects the item name, default: `'checked'` */
  checkedMapName?: string;
  /** Whether the node itself selects the item name, default: `'selected'` */
  selectedMapName?: string;
  /** Whether the node expands (the leaf node is invalid) item name, default: `'expanded'` */
  expandedMapName?: string;
  /** Set whether to disable the node (no operation can be done) item name, default: `'disabled'` */
  disabledMapName?: string;
}
