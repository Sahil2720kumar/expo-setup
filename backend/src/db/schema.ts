import { contactsTable } from "./contactsSchema.js";
import { ordersTable, orderItemsTable,orderItemsTableRelations,ordersTableRelations } from "./ordersSchema.js";
import { productsTable } from "./productsSchema.js";
import { addressesTable, usersTable,usersTableRelations,addressesTableRelations } from "./usersSchema.js";


export {usersTable,productsTable,addressesTable,ordersTable,orderItemsTable,contactsTable}
export {usersTableRelations,addressesTableRelations,orderItemsTableRelations,ordersTableRelations}