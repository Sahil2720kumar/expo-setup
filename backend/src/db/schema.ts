import { contactsTable } from "./contactsSchema";
import { ordersTable, orderItemsTable,orderItemsTableRelations,ordersTableRelations } from "./ordersSchema";
import { productsTable } from "./productsSchema";
import { addressesTable, usersTable,usersTableRelations,addressesTableRelations } from "./usersSchema";


export {usersTable,productsTable,addressesTable,ordersTable,orderItemsTable,contactsTable}
export {usersTableRelations,addressesTableRelations,orderItemsTableRelations,ordersTableRelations}