
<a name="readmemd"></a>


# @raydeck/merge-graphql - v1.0.0

## Index

### Functions

* [mergeDependencies](#mergedependencies)

## Functions

###  mergeDependencies

▸ **mergeDependencies**(`startPath`: string): *Promise‹string›*

*Defined in [index.ts:11](https://github.com/rhdeck/merge-graphql/blob/8018c64/src/index.ts#L11)*

Extract and merge graphql schemas from dependencies into a single string.

Gets all from schemas/common and then just the ones for your project (identified in schemas/{name})

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`startPath` | string | process.cwd() | Path to start looking at package.json and associated node_modules  |

**Returns:** *Promise‹string›*
