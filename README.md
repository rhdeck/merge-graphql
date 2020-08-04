
<a name="readmemd"></a>


# @raydeck/merge-graphql - v1.1.0

## Index

### Functions

* [mergeDependencies](#mergedependencies)
* [mergeFromGlobs](#mergefromglobs)

## Functions

###  mergeDependencies

▸ **mergeDependencies**(`startPath`: string): *Promise‹string›*

*Defined in [index.ts:11](https://github.com/rhdeck/merge-graphql/blob/694b475/src/index.ts#L11)*

Extract and merge graphql schemas from dependencies into a single string.

Gets all from schemas/common and then just the ones for your project (identified in schemas/{name})

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`startPath` | string | process.cwd() | Path to start looking at package.json and associated node_modules  |

**Returns:** *Promise‹string›*

___

###  mergeFromGlobs

▸ **mergeFromGlobs**(`globs`: string[]): *Promise‹string›*

*Defined in [index.ts:36](https://github.com/rhdeck/merge-graphql/blob/694b475/src/index.ts#L36)*

Merge schema files found in an array of glob strings into a single schema file

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`globs` | string[] | array of glob strings (ex: ./schemas/*.graphql)  |

**Returns:** *Promise‹string›*
