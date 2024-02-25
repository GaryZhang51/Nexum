import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','orgId','name','email','pfp','admin','passwordHash']);

export const OrgScalarFieldEnumSchema = z.enum(['id','name']);

export const PartnerScalarFieldEnumSchema = z.enum(['id','orgId','createdAt','updatedAt','name','img','description','tags','notes','email','location','website','phone']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  orgId: z.string(),
  name: z.string(),
  email: z.string(),
  pfp: z.instanceof(Buffer).nullable(),
  admin: z.boolean(),
  passwordHash: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ORG SCHEMA
/////////////////////////////////////////

export const OrgSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export type Org = z.infer<typeof OrgSchema>

/////////////////////////////////////////
// PARTNER SCHEMA
/////////////////////////////////////////

export const PartnerSchema = z.object({
  id: z.string().uuid(),
  orgId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  img: z.instanceof(Buffer).nullable(),
  description: z.string(),
  tags: z.string(),
  notes: z.string().nullable(),
  email: z.string().nullable(),
  location: z.string().nullable(),
  website: z.string().nullable(),
  phone: z.string().nullable(),
})

export type Partner = z.infer<typeof PartnerSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  org: z.union([z.boolean(),z.lazy(() => OrgArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  orgId: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  pfp: z.boolean().optional(),
  admin: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  org: z.union([z.boolean(),z.lazy(() => OrgArgsSchema)]).optional(),
}).strict()

// ORG
//------------------------------------------------------

export const OrgIncludeSchema: z.ZodType<Prisma.OrgInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  partners: z.union([z.boolean(),z.lazy(() => PartnerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrgCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const OrgArgsSchema: z.ZodType<Prisma.OrgDefaultArgs> = z.object({
  select: z.lazy(() => OrgSelectSchema).optional(),
  include: z.lazy(() => OrgIncludeSchema).optional(),
}).strict();

export const OrgCountOutputTypeArgsSchema: z.ZodType<Prisma.OrgCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => OrgCountOutputTypeSelectSchema).nullish(),
}).strict();

export const OrgCountOutputTypeSelectSchema: z.ZodType<Prisma.OrgCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  partners: z.boolean().optional(),
}).strict();

export const OrgSelectSchema: z.ZodType<Prisma.OrgSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  partners: z.union([z.boolean(),z.lazy(() => PartnerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrgCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PARTNER
//------------------------------------------------------

export const PartnerIncludeSchema: z.ZodType<Prisma.PartnerInclude> = z.object({
  org: z.union([z.boolean(),z.lazy(() => OrgArgsSchema)]).optional(),
}).strict()

export const PartnerArgsSchema: z.ZodType<Prisma.PartnerDefaultArgs> = z.object({
  select: z.lazy(() => PartnerSelectSchema).optional(),
  include: z.lazy(() => PartnerIncludeSchema).optional(),
}).strict();

export const PartnerSelectSchema: z.ZodType<Prisma.PartnerSelect> = z.object({
  id: z.boolean().optional(),
  orgId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  name: z.boolean().optional(),
  img: z.boolean().optional(),
  description: z.boolean().optional(),
  tags: z.boolean().optional(),
  notes: z.boolean().optional(),
  email: z.boolean().optional(),
  location: z.boolean().optional(),
  website: z.boolean().optional(),
  phone: z.boolean().optional(),
  org: z.union([z.boolean(),z.lazy(() => OrgArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  orgId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pfp: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  admin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  org: z.union([ z.lazy(() => OrgRelationFilterSchema),z.lazy(() => OrgWhereInputSchema) ]).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orgId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  pfp: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  admin: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  org: z.lazy(() => OrgOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  orgId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pfp: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  admin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  org: z.union([ z.lazy(() => OrgRelationFilterSchema),z.lazy(() => OrgWhereInputSchema) ]).optional(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orgId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  pfp: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  admin: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  orgId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pfp: z.union([ z.lazy(() => BytesNullableWithAggregatesFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  admin: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const OrgWhereInputSchema: z.ZodType<Prisma.OrgWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OrgWhereInputSchema),z.lazy(() => OrgWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrgWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrgWhereInputSchema),z.lazy(() => OrgWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  partners: z.lazy(() => PartnerListRelationFilterSchema).optional()
}).strict();

export const OrgOrderByWithRelationInputSchema: z.ZodType<Prisma.OrgOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  partners: z.lazy(() => PartnerOrderByRelationAggregateInputSchema).optional()
}).strict();

export const OrgWhereUniqueInputSchema: z.ZodType<Prisma.OrgWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => OrgWhereInputSchema),z.lazy(() => OrgWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrgWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrgWhereInputSchema),z.lazy(() => OrgWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  partners: z.lazy(() => PartnerListRelationFilterSchema).optional()
}).strict());

export const OrgOrderByWithAggregationInputSchema: z.ZodType<Prisma.OrgOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => OrgCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => OrgMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => OrgMinOrderByAggregateInputSchema).optional()
}).strict();

export const OrgScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OrgScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => OrgScalarWhereWithAggregatesInputSchema),z.lazy(() => OrgScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrgScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrgScalarWhereWithAggregatesInputSchema),z.lazy(() => OrgScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PartnerWhereInputSchema: z.ZodType<Prisma.PartnerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PartnerWhereInputSchema),z.lazy(() => PartnerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PartnerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PartnerWhereInputSchema),z.lazy(() => PartnerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  orgId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  org: z.union([ z.lazy(() => OrgRelationFilterSchema),z.lazy(() => OrgWhereInputSchema) ]).optional(),
}).strict();

export const PartnerOrderByWithRelationInputSchema: z.ZodType<Prisma.PartnerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orgId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  img: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  website: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  org: z.lazy(() => OrgOrderByWithRelationInputSchema).optional()
}).strict();

export const PartnerWhereUniqueInputSchema: z.ZodType<Prisma.PartnerWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => PartnerWhereInputSchema),z.lazy(() => PartnerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PartnerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PartnerWhereInputSchema),z.lazy(() => PartnerWhereInputSchema).array() ]).optional(),
  orgId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  org: z.union([ z.lazy(() => OrgRelationFilterSchema),z.lazy(() => OrgWhereInputSchema) ]).optional(),
}).strict());

export const PartnerOrderByWithAggregationInputSchema: z.ZodType<Prisma.PartnerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orgId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  img: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  website: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PartnerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PartnerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PartnerMinOrderByAggregateInputSchema).optional()
}).strict();

export const PartnerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PartnerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PartnerScalarWhereWithAggregatesInputSchema),z.lazy(() => PartnerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PartnerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PartnerScalarWhereWithAggregatesInputSchema),z.lazy(() => PartnerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  orgId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => BytesNullableWithAggregatesFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tags: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  pfp: z.instanceof(Buffer).optional().nullable(),
  admin: z.boolean().optional(),
  passwordHash: z.string(),
  org: z.lazy(() => OrgCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  orgId: z.string(),
  name: z.string(),
  email: z.string(),
  pfp: z.instanceof(Buffer).optional().nullable(),
  admin: z.boolean().optional(),
  passwordHash: z.string()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pfp: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  org: z.lazy(() => OrgUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orgId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pfp: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pfp: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orgId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pfp: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrgCreateInputSchema: z.ZodType<Prisma.OrgCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  users: z.lazy(() => UserCreateNestedManyWithoutOrgInputSchema).optional(),
  partners: z.lazy(() => PartnerCreateNestedManyWithoutOrgInputSchema).optional()
}).strict();

export const OrgUncheckedCreateInputSchema: z.ZodType<Prisma.OrgUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutOrgInputSchema).optional(),
  partners: z.lazy(() => PartnerUncheckedCreateNestedManyWithoutOrgInputSchema).optional()
}).strict();

export const OrgUpdateInputSchema: z.ZodType<Prisma.OrgUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutOrgNestedInputSchema).optional(),
  partners: z.lazy(() => PartnerUpdateManyWithoutOrgNestedInputSchema).optional()
}).strict();

export const OrgUncheckedUpdateInputSchema: z.ZodType<Prisma.OrgUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutOrgNestedInputSchema).optional(),
  partners: z.lazy(() => PartnerUncheckedUpdateManyWithoutOrgNestedInputSchema).optional()
}).strict();

export const OrgUpdateManyMutationInputSchema: z.ZodType<Prisma.OrgUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const OrgUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OrgUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PartnerCreateInputSchema: z.ZodType<Prisma.PartnerCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  img: z.instanceof(Buffer).optional().nullable(),
  description: z.string(),
  tags: z.string(),
  notes: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  org: z.lazy(() => OrgCreateNestedOneWithoutPartnersInputSchema)
}).strict();

export const PartnerUncheckedCreateInputSchema: z.ZodType<Prisma.PartnerUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  orgId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  img: z.instanceof(Buffer).optional().nullable(),
  description: z.string(),
  tags: z.string(),
  notes: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  phone: z.string().optional().nullable()
}).strict();

export const PartnerUpdateInputSchema: z.ZodType<Prisma.PartnerUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  org: z.lazy(() => OrgUpdateOneRequiredWithoutPartnersNestedInputSchema).optional()
}).strict();

export const PartnerUncheckedUpdateInputSchema: z.ZodType<Prisma.PartnerUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orgId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PartnerUpdateManyMutationInputSchema: z.ZodType<Prisma.PartnerUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PartnerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PartnerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orgId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BytesNullableFilterSchema: z.ZodType<Prisma.BytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const OrgRelationFilterSchema: z.ZodType<Prisma.OrgRelationFilter> = z.object({
  is: z.lazy(() => OrgWhereInputSchema).optional(),
  isNot: z.lazy(() => OrgWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orgId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  pfp: z.lazy(() => SortOrderSchema).optional(),
  admin: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orgId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  pfp: z.lazy(() => SortOrderSchema).optional(),
  admin: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orgId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  pfp: z.lazy(() => SortOrderSchema).optional(),
  admin: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BytesNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BytesNullableWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const PartnerListRelationFilterSchema: z.ZodType<Prisma.PartnerListRelationFilter> = z.object({
  every: z.lazy(() => PartnerWhereInputSchema).optional(),
  some: z.lazy(() => PartnerWhereInputSchema).optional(),
  none: z.lazy(() => PartnerWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PartnerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PartnerOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrgCountOrderByAggregateInputSchema: z.ZodType<Prisma.OrgCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrgMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OrgMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrgMinOrderByAggregateInputSchema: z.ZodType<Prisma.OrgMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PartnerCountOrderByAggregateInputSchema: z.ZodType<Prisma.PartnerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orgId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PartnerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PartnerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orgId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PartnerMinOrderByAggregateInputSchema: z.ZodType<Prisma.PartnerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orgId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const OrgCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.OrgCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => OrgCreateWithoutUsersInputSchema),z.lazy(() => OrgUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrgCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => OrgWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableBytesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional().nullable()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const OrgUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.OrgUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrgCreateWithoutUsersInputSchema),z.lazy(() => OrgUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrgCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => OrgUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => OrgWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrgUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => OrgUpdateWithoutUsersInputSchema),z.lazy(() => OrgUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutOrgInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutOrgInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOrgInputSchema),z.lazy(() => UserCreateWithoutOrgInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutOrgInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrgInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutOrgInputSchema),z.lazy(() => UserCreateOrConnectWithoutOrgInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PartnerCreateNestedManyWithoutOrgInputSchema: z.ZodType<Prisma.PartnerCreateNestedManyWithoutOrgInput> = z.object({
  create: z.union([ z.lazy(() => PartnerCreateWithoutOrgInputSchema),z.lazy(() => PartnerCreateWithoutOrgInputSchema).array(),z.lazy(() => PartnerUncheckedCreateWithoutOrgInputSchema),z.lazy(() => PartnerUncheckedCreateWithoutOrgInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartnerCreateOrConnectWithoutOrgInputSchema),z.lazy(() => PartnerCreateOrConnectWithoutOrgInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PartnerWhereUniqueInputSchema),z.lazy(() => PartnerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutOrgInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutOrgInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOrgInputSchema),z.lazy(() => UserCreateWithoutOrgInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutOrgInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrgInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutOrgInputSchema),z.lazy(() => UserCreateOrConnectWithoutOrgInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PartnerUncheckedCreateNestedManyWithoutOrgInputSchema: z.ZodType<Prisma.PartnerUncheckedCreateNestedManyWithoutOrgInput> = z.object({
  create: z.union([ z.lazy(() => PartnerCreateWithoutOrgInputSchema),z.lazy(() => PartnerCreateWithoutOrgInputSchema).array(),z.lazy(() => PartnerUncheckedCreateWithoutOrgInputSchema),z.lazy(() => PartnerUncheckedCreateWithoutOrgInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartnerCreateOrConnectWithoutOrgInputSchema),z.lazy(() => PartnerCreateOrConnectWithoutOrgInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PartnerWhereUniqueInputSchema),z.lazy(() => PartnerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutOrgNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutOrgNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOrgInputSchema),z.lazy(() => UserCreateWithoutOrgInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutOrgInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrgInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutOrgInputSchema),z.lazy(() => UserCreateOrConnectWithoutOrgInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutOrgInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutOrgInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutOrgInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutOrgInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutOrgInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutOrgInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PartnerUpdateManyWithoutOrgNestedInputSchema: z.ZodType<Prisma.PartnerUpdateManyWithoutOrgNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartnerCreateWithoutOrgInputSchema),z.lazy(() => PartnerCreateWithoutOrgInputSchema).array(),z.lazy(() => PartnerUncheckedCreateWithoutOrgInputSchema),z.lazy(() => PartnerUncheckedCreateWithoutOrgInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartnerCreateOrConnectWithoutOrgInputSchema),z.lazy(() => PartnerCreateOrConnectWithoutOrgInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PartnerUpsertWithWhereUniqueWithoutOrgInputSchema),z.lazy(() => PartnerUpsertWithWhereUniqueWithoutOrgInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PartnerWhereUniqueInputSchema),z.lazy(() => PartnerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PartnerWhereUniqueInputSchema),z.lazy(() => PartnerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PartnerWhereUniqueInputSchema),z.lazy(() => PartnerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PartnerWhereUniqueInputSchema),z.lazy(() => PartnerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PartnerUpdateWithWhereUniqueWithoutOrgInputSchema),z.lazy(() => PartnerUpdateWithWhereUniqueWithoutOrgInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PartnerUpdateManyWithWhereWithoutOrgInputSchema),z.lazy(() => PartnerUpdateManyWithWhereWithoutOrgInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PartnerScalarWhereInputSchema),z.lazy(() => PartnerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutOrgNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutOrgNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutOrgInputSchema),z.lazy(() => UserCreateWithoutOrgInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutOrgInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrgInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutOrgInputSchema),z.lazy(() => UserCreateOrConnectWithoutOrgInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutOrgInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutOrgInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutOrgInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutOrgInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutOrgInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutOrgInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PartnerUncheckedUpdateManyWithoutOrgNestedInputSchema: z.ZodType<Prisma.PartnerUncheckedUpdateManyWithoutOrgNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartnerCreateWithoutOrgInputSchema),z.lazy(() => PartnerCreateWithoutOrgInputSchema).array(),z.lazy(() => PartnerUncheckedCreateWithoutOrgInputSchema),z.lazy(() => PartnerUncheckedCreateWithoutOrgInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartnerCreateOrConnectWithoutOrgInputSchema),z.lazy(() => PartnerCreateOrConnectWithoutOrgInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PartnerUpsertWithWhereUniqueWithoutOrgInputSchema),z.lazy(() => PartnerUpsertWithWhereUniqueWithoutOrgInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PartnerWhereUniqueInputSchema),z.lazy(() => PartnerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PartnerWhereUniqueInputSchema),z.lazy(() => PartnerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PartnerWhereUniqueInputSchema),z.lazy(() => PartnerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PartnerWhereUniqueInputSchema),z.lazy(() => PartnerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PartnerUpdateWithWhereUniqueWithoutOrgInputSchema),z.lazy(() => PartnerUpdateWithWhereUniqueWithoutOrgInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PartnerUpdateManyWithWhereWithoutOrgInputSchema),z.lazy(() => PartnerUpdateManyWithWhereWithoutOrgInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PartnerScalarWhereInputSchema),z.lazy(() => PartnerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrgCreateNestedOneWithoutPartnersInputSchema: z.ZodType<Prisma.OrgCreateNestedOneWithoutPartnersInput> = z.object({
  create: z.union([ z.lazy(() => OrgCreateWithoutPartnersInputSchema),z.lazy(() => OrgUncheckedCreateWithoutPartnersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrgCreateOrConnectWithoutPartnersInputSchema).optional(),
  connect: z.lazy(() => OrgWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const OrgUpdateOneRequiredWithoutPartnersNestedInputSchema: z.ZodType<Prisma.OrgUpdateOneRequiredWithoutPartnersNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrgCreateWithoutPartnersInputSchema),z.lazy(() => OrgUncheckedCreateWithoutPartnersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrgCreateOrConnectWithoutPartnersInputSchema).optional(),
  upsert: z.lazy(() => OrgUpsertWithoutPartnersInputSchema).optional(),
  connect: z.lazy(() => OrgWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrgUpdateToOneWithWhereWithoutPartnersInputSchema),z.lazy(() => OrgUpdateWithoutPartnersInputSchema),z.lazy(() => OrgUncheckedUpdateWithoutPartnersInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBytesNullableFilterSchema: z.ZodType<Prisma.NestedBytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedBytesNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBytesNullableWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const OrgCreateWithoutUsersInputSchema: z.ZodType<Prisma.OrgCreateWithoutUsersInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  partners: z.lazy(() => PartnerCreateNestedManyWithoutOrgInputSchema).optional()
}).strict();

export const OrgUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.OrgUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  partners: z.lazy(() => PartnerUncheckedCreateNestedManyWithoutOrgInputSchema).optional()
}).strict();

export const OrgCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.OrgCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => OrgWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrgCreateWithoutUsersInputSchema),z.lazy(() => OrgUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const OrgUpsertWithoutUsersInputSchema: z.ZodType<Prisma.OrgUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => OrgUpdateWithoutUsersInputSchema),z.lazy(() => OrgUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => OrgCreateWithoutUsersInputSchema),z.lazy(() => OrgUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => OrgWhereInputSchema).optional()
}).strict();

export const OrgUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.OrgUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => OrgWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrgUpdateWithoutUsersInputSchema),z.lazy(() => OrgUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const OrgUpdateWithoutUsersInputSchema: z.ZodType<Prisma.OrgUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  partners: z.lazy(() => PartnerUpdateManyWithoutOrgNestedInputSchema).optional()
}).strict();

export const OrgUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.OrgUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  partners: z.lazy(() => PartnerUncheckedUpdateManyWithoutOrgNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutOrgInputSchema: z.ZodType<Prisma.UserCreateWithoutOrgInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  pfp: z.instanceof(Buffer).optional().nullable(),
  admin: z.boolean().optional(),
  passwordHash: z.string()
}).strict();

export const UserUncheckedCreateWithoutOrgInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutOrgInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  pfp: z.instanceof(Buffer).optional().nullable(),
  admin: z.boolean().optional(),
  passwordHash: z.string()
}).strict();

export const UserCreateOrConnectWithoutOrgInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutOrgInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutOrgInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrgInputSchema) ]),
}).strict();

export const PartnerCreateWithoutOrgInputSchema: z.ZodType<Prisma.PartnerCreateWithoutOrgInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  img: z.instanceof(Buffer).optional().nullable(),
  description: z.string(),
  tags: z.string(),
  notes: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  phone: z.string().optional().nullable()
}).strict();

export const PartnerUncheckedCreateWithoutOrgInputSchema: z.ZodType<Prisma.PartnerUncheckedCreateWithoutOrgInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  img: z.instanceof(Buffer).optional().nullable(),
  description: z.string(),
  tags: z.string(),
  notes: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  phone: z.string().optional().nullable()
}).strict();

export const PartnerCreateOrConnectWithoutOrgInputSchema: z.ZodType<Prisma.PartnerCreateOrConnectWithoutOrgInput> = z.object({
  where: z.lazy(() => PartnerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PartnerCreateWithoutOrgInputSchema),z.lazy(() => PartnerUncheckedCreateWithoutOrgInputSchema) ]),
}).strict();

export const UserUpsertWithWhereUniqueWithoutOrgInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutOrgInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutOrgInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOrgInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutOrgInputSchema),z.lazy(() => UserUncheckedCreateWithoutOrgInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutOrgInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutOrgInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutOrgInputSchema),z.lazy(() => UserUncheckedUpdateWithoutOrgInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutOrgInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutOrgInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutOrgInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  orgId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pfp: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  admin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PartnerUpsertWithWhereUniqueWithoutOrgInputSchema: z.ZodType<Prisma.PartnerUpsertWithWhereUniqueWithoutOrgInput> = z.object({
  where: z.lazy(() => PartnerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PartnerUpdateWithoutOrgInputSchema),z.lazy(() => PartnerUncheckedUpdateWithoutOrgInputSchema) ]),
  create: z.union([ z.lazy(() => PartnerCreateWithoutOrgInputSchema),z.lazy(() => PartnerUncheckedCreateWithoutOrgInputSchema) ]),
}).strict();

export const PartnerUpdateWithWhereUniqueWithoutOrgInputSchema: z.ZodType<Prisma.PartnerUpdateWithWhereUniqueWithoutOrgInput> = z.object({
  where: z.lazy(() => PartnerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PartnerUpdateWithoutOrgInputSchema),z.lazy(() => PartnerUncheckedUpdateWithoutOrgInputSchema) ]),
}).strict();

export const PartnerUpdateManyWithWhereWithoutOrgInputSchema: z.ZodType<Prisma.PartnerUpdateManyWithWhereWithoutOrgInput> = z.object({
  where: z.lazy(() => PartnerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PartnerUpdateManyMutationInputSchema),z.lazy(() => PartnerUncheckedUpdateManyWithoutOrgInputSchema) ]),
}).strict();

export const PartnerScalarWhereInputSchema: z.ZodType<Prisma.PartnerScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PartnerScalarWhereInputSchema),z.lazy(() => PartnerScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PartnerScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PartnerScalarWhereInputSchema),z.lazy(() => PartnerScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  orgId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const OrgCreateWithoutPartnersInputSchema: z.ZodType<Prisma.OrgCreateWithoutPartnersInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  users: z.lazy(() => UserCreateNestedManyWithoutOrgInputSchema).optional()
}).strict();

export const OrgUncheckedCreateWithoutPartnersInputSchema: z.ZodType<Prisma.OrgUncheckedCreateWithoutPartnersInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutOrgInputSchema).optional()
}).strict();

export const OrgCreateOrConnectWithoutPartnersInputSchema: z.ZodType<Prisma.OrgCreateOrConnectWithoutPartnersInput> = z.object({
  where: z.lazy(() => OrgWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrgCreateWithoutPartnersInputSchema),z.lazy(() => OrgUncheckedCreateWithoutPartnersInputSchema) ]),
}).strict();

export const OrgUpsertWithoutPartnersInputSchema: z.ZodType<Prisma.OrgUpsertWithoutPartnersInput> = z.object({
  update: z.union([ z.lazy(() => OrgUpdateWithoutPartnersInputSchema),z.lazy(() => OrgUncheckedUpdateWithoutPartnersInputSchema) ]),
  create: z.union([ z.lazy(() => OrgCreateWithoutPartnersInputSchema),z.lazy(() => OrgUncheckedCreateWithoutPartnersInputSchema) ]),
  where: z.lazy(() => OrgWhereInputSchema).optional()
}).strict();

export const OrgUpdateToOneWithWhereWithoutPartnersInputSchema: z.ZodType<Prisma.OrgUpdateToOneWithWhereWithoutPartnersInput> = z.object({
  where: z.lazy(() => OrgWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrgUpdateWithoutPartnersInputSchema),z.lazy(() => OrgUncheckedUpdateWithoutPartnersInputSchema) ]),
}).strict();

export const OrgUpdateWithoutPartnersInputSchema: z.ZodType<Prisma.OrgUpdateWithoutPartnersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutOrgNestedInputSchema).optional()
}).strict();

export const OrgUncheckedUpdateWithoutPartnersInputSchema: z.ZodType<Prisma.OrgUncheckedUpdateWithoutPartnersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutOrgNestedInputSchema).optional()
}).strict();

export const UserUpdateWithoutOrgInputSchema: z.ZodType<Prisma.UserUpdateWithoutOrgInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pfp: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutOrgInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutOrgInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pfp: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutOrgInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutOrgInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pfp: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  admin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PartnerUpdateWithoutOrgInputSchema: z.ZodType<Prisma.PartnerUpdateWithoutOrgInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PartnerUncheckedUpdateWithoutOrgInputSchema: z.ZodType<Prisma.PartnerUncheckedUpdateWithoutOrgInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PartnerUncheckedUpdateManyWithoutOrgInputSchema: z.ZodType<Prisma.PartnerUncheckedUpdateManyWithoutOrgInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const OrgFindFirstArgsSchema: z.ZodType<Prisma.OrgFindFirstArgs> = z.object({
  select: OrgSelectSchema.optional(),
  include: OrgIncludeSchema.optional(),
  where: OrgWhereInputSchema.optional(),
  orderBy: z.union([ OrgOrderByWithRelationInputSchema.array(),OrgOrderByWithRelationInputSchema ]).optional(),
  cursor: OrgWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrgScalarFieldEnumSchema,OrgScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OrgFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OrgFindFirstOrThrowArgs> = z.object({
  select: OrgSelectSchema.optional(),
  include: OrgIncludeSchema.optional(),
  where: OrgWhereInputSchema.optional(),
  orderBy: z.union([ OrgOrderByWithRelationInputSchema.array(),OrgOrderByWithRelationInputSchema ]).optional(),
  cursor: OrgWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrgScalarFieldEnumSchema,OrgScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OrgFindManyArgsSchema: z.ZodType<Prisma.OrgFindManyArgs> = z.object({
  select: OrgSelectSchema.optional(),
  include: OrgIncludeSchema.optional(),
  where: OrgWhereInputSchema.optional(),
  orderBy: z.union([ OrgOrderByWithRelationInputSchema.array(),OrgOrderByWithRelationInputSchema ]).optional(),
  cursor: OrgWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrgScalarFieldEnumSchema,OrgScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OrgAggregateArgsSchema: z.ZodType<Prisma.OrgAggregateArgs> = z.object({
  where: OrgWhereInputSchema.optional(),
  orderBy: z.union([ OrgOrderByWithRelationInputSchema.array(),OrgOrderByWithRelationInputSchema ]).optional(),
  cursor: OrgWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const OrgGroupByArgsSchema: z.ZodType<Prisma.OrgGroupByArgs> = z.object({
  where: OrgWhereInputSchema.optional(),
  orderBy: z.union([ OrgOrderByWithAggregationInputSchema.array(),OrgOrderByWithAggregationInputSchema ]).optional(),
  by: OrgScalarFieldEnumSchema.array(),
  having: OrgScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const OrgFindUniqueArgsSchema: z.ZodType<Prisma.OrgFindUniqueArgs> = z.object({
  select: OrgSelectSchema.optional(),
  include: OrgIncludeSchema.optional(),
  where: OrgWhereUniqueInputSchema,
}).strict() ;

export const OrgFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OrgFindUniqueOrThrowArgs> = z.object({
  select: OrgSelectSchema.optional(),
  include: OrgIncludeSchema.optional(),
  where: OrgWhereUniqueInputSchema,
}).strict() ;

export const PartnerFindFirstArgsSchema: z.ZodType<Prisma.PartnerFindFirstArgs> = z.object({
  select: PartnerSelectSchema.optional(),
  include: PartnerIncludeSchema.optional(),
  where: PartnerWhereInputSchema.optional(),
  orderBy: z.union([ PartnerOrderByWithRelationInputSchema.array(),PartnerOrderByWithRelationInputSchema ]).optional(),
  cursor: PartnerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PartnerScalarFieldEnumSchema,PartnerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PartnerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PartnerFindFirstOrThrowArgs> = z.object({
  select: PartnerSelectSchema.optional(),
  include: PartnerIncludeSchema.optional(),
  where: PartnerWhereInputSchema.optional(),
  orderBy: z.union([ PartnerOrderByWithRelationInputSchema.array(),PartnerOrderByWithRelationInputSchema ]).optional(),
  cursor: PartnerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PartnerScalarFieldEnumSchema,PartnerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PartnerFindManyArgsSchema: z.ZodType<Prisma.PartnerFindManyArgs> = z.object({
  select: PartnerSelectSchema.optional(),
  include: PartnerIncludeSchema.optional(),
  where: PartnerWhereInputSchema.optional(),
  orderBy: z.union([ PartnerOrderByWithRelationInputSchema.array(),PartnerOrderByWithRelationInputSchema ]).optional(),
  cursor: PartnerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PartnerScalarFieldEnumSchema,PartnerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PartnerAggregateArgsSchema: z.ZodType<Prisma.PartnerAggregateArgs> = z.object({
  where: PartnerWhereInputSchema.optional(),
  orderBy: z.union([ PartnerOrderByWithRelationInputSchema.array(),PartnerOrderByWithRelationInputSchema ]).optional(),
  cursor: PartnerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PartnerGroupByArgsSchema: z.ZodType<Prisma.PartnerGroupByArgs> = z.object({
  where: PartnerWhereInputSchema.optional(),
  orderBy: z.union([ PartnerOrderByWithAggregationInputSchema.array(),PartnerOrderByWithAggregationInputSchema ]).optional(),
  by: PartnerScalarFieldEnumSchema.array(),
  having: PartnerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PartnerFindUniqueArgsSchema: z.ZodType<Prisma.PartnerFindUniqueArgs> = z.object({
  select: PartnerSelectSchema.optional(),
  include: PartnerIncludeSchema.optional(),
  where: PartnerWhereUniqueInputSchema,
}).strict() ;

export const PartnerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PartnerFindUniqueOrThrowArgs> = z.object({
  select: PartnerSelectSchema.optional(),
  include: PartnerIncludeSchema.optional(),
  where: PartnerWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const OrgCreateArgsSchema: z.ZodType<Prisma.OrgCreateArgs> = z.object({
  select: OrgSelectSchema.optional(),
  include: OrgIncludeSchema.optional(),
  data: z.union([ OrgCreateInputSchema,OrgUncheckedCreateInputSchema ]),
}).strict() ;

export const OrgUpsertArgsSchema: z.ZodType<Prisma.OrgUpsertArgs> = z.object({
  select: OrgSelectSchema.optional(),
  include: OrgIncludeSchema.optional(),
  where: OrgWhereUniqueInputSchema,
  create: z.union([ OrgCreateInputSchema,OrgUncheckedCreateInputSchema ]),
  update: z.union([ OrgUpdateInputSchema,OrgUncheckedUpdateInputSchema ]),
}).strict() ;

export const OrgDeleteArgsSchema: z.ZodType<Prisma.OrgDeleteArgs> = z.object({
  select: OrgSelectSchema.optional(),
  include: OrgIncludeSchema.optional(),
  where: OrgWhereUniqueInputSchema,
}).strict() ;

export const OrgUpdateArgsSchema: z.ZodType<Prisma.OrgUpdateArgs> = z.object({
  select: OrgSelectSchema.optional(),
  include: OrgIncludeSchema.optional(),
  data: z.union([ OrgUpdateInputSchema,OrgUncheckedUpdateInputSchema ]),
  where: OrgWhereUniqueInputSchema,
}).strict() ;

export const OrgUpdateManyArgsSchema: z.ZodType<Prisma.OrgUpdateManyArgs> = z.object({
  data: z.union([ OrgUpdateManyMutationInputSchema,OrgUncheckedUpdateManyInputSchema ]),
  where: OrgWhereInputSchema.optional(),
}).strict() ;

export const OrgDeleteManyArgsSchema: z.ZodType<Prisma.OrgDeleteManyArgs> = z.object({
  where: OrgWhereInputSchema.optional(),
}).strict() ;

export const PartnerCreateArgsSchema: z.ZodType<Prisma.PartnerCreateArgs> = z.object({
  select: PartnerSelectSchema.optional(),
  include: PartnerIncludeSchema.optional(),
  data: z.union([ PartnerCreateInputSchema,PartnerUncheckedCreateInputSchema ]),
}).strict() ;

export const PartnerUpsertArgsSchema: z.ZodType<Prisma.PartnerUpsertArgs> = z.object({
  select: PartnerSelectSchema.optional(),
  include: PartnerIncludeSchema.optional(),
  where: PartnerWhereUniqueInputSchema,
  create: z.union([ PartnerCreateInputSchema,PartnerUncheckedCreateInputSchema ]),
  update: z.union([ PartnerUpdateInputSchema,PartnerUncheckedUpdateInputSchema ]),
}).strict() ;

export const PartnerDeleteArgsSchema: z.ZodType<Prisma.PartnerDeleteArgs> = z.object({
  select: PartnerSelectSchema.optional(),
  include: PartnerIncludeSchema.optional(),
  where: PartnerWhereUniqueInputSchema,
}).strict() ;

export const PartnerUpdateArgsSchema: z.ZodType<Prisma.PartnerUpdateArgs> = z.object({
  select: PartnerSelectSchema.optional(),
  include: PartnerIncludeSchema.optional(),
  data: z.union([ PartnerUpdateInputSchema,PartnerUncheckedUpdateInputSchema ]),
  where: PartnerWhereUniqueInputSchema,
}).strict() ;

export const PartnerUpdateManyArgsSchema: z.ZodType<Prisma.PartnerUpdateManyArgs> = z.object({
  data: z.union([ PartnerUpdateManyMutationInputSchema,PartnerUncheckedUpdateManyInputSchema ]),
  where: PartnerWhereInputSchema.optional(),
}).strict() ;

export const PartnerDeleteManyArgsSchema: z.ZodType<Prisma.PartnerDeleteManyArgs> = z.object({
  where: PartnerWhereInputSchema.optional(),
}).strict() ;