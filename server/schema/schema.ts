import { int, varchar, boolean, timestamp, decimal, uniqueIndex } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';

const tableFunc = mysqlTable;

// Model: Admin
export const Admin = tableFunc('Admin', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }).default('OVERALL_ADMIN'),
});

// Model: Customer
export const Customer = tableFunc('Customer', {
  id: int('id').autoincrement().primaryKey(),
  fullName: varchar('firstName', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  address: varchar('address', { length: 255 }),
  phone: varchar('phone', { length: 255 }),
  role: varchar('role', { length: 255 }).default('CUSTOMER'),
});

// Model: BusinessAdmin
export const BusinessAdmin = tableFunc('BusinessAdmin', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }).default('BUSINESS_ADMIN'),
});

// Model: Business
export const Business = tableFunc('Business', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phoneNumber: varchar('phoneNumber', { length: 255 }),
  email: varchar('email', { length: 255 }),
  address: varchar('address', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  country: varchar('country', { length: 255 }).notNull(),
  productId: varchar('productId', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
  confirmed: boolean('confirmed').default(false),
  registered: boolean('registered').default(false),
  image: varchar('image', { length: 255 }),
});

// Model: Store
export const Store = tableFunc('Store', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phoneNumber: varchar('phoneNumber', { length: 255 }),
  address: varchar('address', { length: 255 }),
  location: varchar('location', { length: 255 }),
  country: varchar('country', { length: 255 }),
  slug: varchar('slug', { length: 255 }),
  customerId: int('customerId'),
  businessId: varchar('businessId', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
});

// Model: Product
export const Product = tableFunc('Product', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }),
  description: varchar('description', { length: 500 }),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  discountedPrice: decimal('discountedPrice', { precision: 10, scale: 2 }),
  quantity: decimal('quantity', { precision: 10, scale: 2 }),
  isFeatured: boolean('isFeatured').default(false),
  isArchived: boolean('isArchived').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
  storeId: int('storeId').notNull(),
  colorId: varchar('colorId', { length: 255 }).notNull(),
});

// Model: Order
export const Order = tableFunc('Order', {
  id: int('id').autoincrement().primaryKey(),
  isPaid: boolean('isPaid').default(false),
  phone: varchar('phone', { length: 255 }).default(''),
  address: varchar('address', { length: 255 }).default(''),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
  storeId: int('storeId').notNull(),
  customerId: int('customerId'),
});

// Model: OrderItem
export const OrderItem = tableFunc('OrderItem', {
  id: int('id').autoincrement().primaryKey(),
  orderId: int('orderId').notNull(),
  productId: int('productId').notNull(),
});

// Model: Image
export const Image = tableFunc('Image', {
  id: int('id').autoincrement().primaryKey(),
  fileName: varchar('fileName', { length: 255 }).notNull(),
  imageUrl: varchar('imageUrl', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  productId: int('productId'),
  businessAdminId: int('businessAdminId'),
  businessId: int('businessId'),
  storeId: int('storeId'),
});

// Unique indexes
