import { ExtractParamsFromURL, ExtractParamsFromRestURL, ExtractParamsFromURLQueryString, ExtractParamsFromURLWithoutQueryString } from "./types";

type Params2 =
  ExtractParamsFromURLQueryString<'https://jsonplaceholder.typicode.com/posts/{postId}/comments/:commentId?mydata={test}'>;
// ^?

type Params =
  ExtractParamsFromURLWithoutQueryString<'https://jsonplaceholder.typicode.com/posts/{postId}/comments/:commentId?test={test}'>;
// ^?

type Params3 =
  ExtractParamsFromURLQueryString<'https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/resources?$filter={$filter}&$expand={$expand}&$top={$top}&api-version=2021-04-01'>;
// ^?
const data4: Params3 = {
  // resourceGroupName: '',
  // subscriptionId: '',
  $expand: '',
  $filter: '',
  $top: '',
};

type Params4 =
  ExtractParamsFromURL<'https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/resources?$filter={$filter}&$expand={$expand}&$top={$top}&api-version=2021-04-01'>;
// ^?
const data: Params4 = {
  resourceGroupName: '',
  subscriptionId: '',
  $expand: '',
  $filter: '',
  $top: '',
};


type Params5 = ExtractParamsFromRestURL<'GET https://jsonplaceholder.typicode.com/posts/{postId}/comments/{commentId}'>;
    // ^?
