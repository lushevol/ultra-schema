import Cashflows from '../../../database/cashflow';
import FieldsSchemas from '../../../database/fields-schema';
import { ratanFields2AgGridCol } from '../../../schema-utils/ratan-fields-ag-grid';
import MyAgGridRoot from '../grid-root';

const colDefs = ratanFields2AgGridCol(FieldsSchemas);

export const AgGridWithSchema = () => {
  return <MyAgGridRoot rowData={Cashflows} colDefs={colDefs} />;
};
