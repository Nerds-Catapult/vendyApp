import { pgTable, serial, text, integer, boolean, timestamp, decimal, uniqueIndex } from 'drizzle-orm/pg-core';
import { sqliteTable } from 'drizzle-orm/sqlite-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';


const tableFunc = mysqlTable; // For MySQL

// Model: Admin
export const Admin = pgTable('Admin', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    role: text('role').default('OVERALL_ADMIN'),
});

// Model: Customer
export const Customer = pgTable ('Customer', {
  id: serial('id').primaryKey(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  address: text('address'),
  phone: text('phone'),
  role: text('role').default('CUSTOMER'),
});

// Model: BusinessAdmin
export const BusinessAdmin = tableFunc('BusinessAdmin', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  password: text('password').notNull(),
  role: text('role').default('BUSINESS_ADMIN'),
});

// Model: Business
export const Business = pgTable('Business', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phoneNumber: text('phoneNumber'),
  email: text('email'),
  address: text('address').notNull(),
  city: text('city').notNull(),
  country: text('country').notNull(),
  productId: text('productId'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
  confirmed: boolean('confirmed').default(false),
  registered: boolean('registered').default(false),
  image: text('image'),
});

// Model: Store
export const Store = tableFunc('Store', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phoneNumber: text('phoneNumber'),
  address: text('address'),
  location: text('location'),
  country: text('country'),
  slug: text('slug'),
  customerId: integer('customerId'),
  businessId: text('businessId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
});

// Model: Product
export const Product = tableFunc('Product', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug'),
  description: text('description'),
  price: decimal('price').notNull(),
  discountedPrice: decimal('discountedPrice'),
  quantity: decimal('quantity'),
  isFeatured: boolean('isFeatured').default(false),
  isArchived: boolean('isArchived').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
  storeId: integer('storeId').notNull(),
  colorId: text('colorId').notNull(),
});

// Model: Order
export const Order = tableFunc('Order', {
  id: serial('id').primaryKey(),
  isPaid: boolean('isPaid').default(false),
  phone: text('phone').default(''),
  address: text('address').default(''),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
  storeId: integer('storeId').notNull(),
  customerId: integer('customerId'),
});

// Model: OrderItem
export const OrderItem = tableFunc('OrderItem', {
  id: serial('id').primaryKey(),
  orderId: integer('orderId').notNull(),
  productId: integer('productId').notNull(),
});

// Model: Image
export const Image = tableFunc('Image', {
  id: serial('id').primaryKey(),
  fileName: text('fileName').notNull(),
  imageUrl: text('imageUrl').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  productId: integer('productId').default(0),
  businessAdminId: integer('businessAdminId').default(0),
  businessId: integer('businessId').default(0),
  storeId: integer('storeId').default(0),
});

// Unique indexes
uniqueIndex(Admin, ['email']);
uniqueIndex(Customer, ['email']);
uniqueIndex(BusinessAdmin, ['email']);
uniqueIndex(Business, ['name']);
uniqueIndex(Store, ['slug']);
uniqueIndex(Product, ['slug', 'storeId']);