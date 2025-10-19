type GraphQLEdge<T> = { node?: T | null | undefined } | null | undefined;
type GraphQLEdges<T> = ReadonlyArray<GraphQLEdge<T>> | null | undefined;

type GraphQLPageInfo = {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    startCursor?: string | null;
    endCursor?: string | null;
};

type GraphQLConnection<T = unknown> = { pageInfo?: T | null } | null | undefined;
type GraphQLCountable = { totalCount?: number } | null | undefined;

function isNonNullEdge<T>(edge: GraphQLEdge<T>): edge is { node: T } {
    return edge !== null && edge !== undefined && edge.node !== null && edge.node !== undefined;
}

function isNonNull<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

function hasTypename<T extends string>(obj: unknown, typename: T): obj is { __typename: T } {
    return (obj as { __typename?: string })?.__typename === typename;
}

export function extractPageInfo<T extends GraphQLPageInfo>(data: GraphQLConnection<T>): T | null {
    return data?.pageInfo ?? null;
}

export function extractTotalCount(data: GraphQLCountable): number {
    return data?.totalCount ?? 0;
}

export function mapEdges<TNode, TResult>(edges: GraphQLEdges<TNode>, mapper: (node: TNode) => TResult): TResult[] {
    if (!edges) return [];
    return edges
        .filter(isNonNullEdge)
        .map((edge) => mapper(edge.node))
        .filter(isNonNull);
}

export function filterEdgesByTypename<T extends string, TNode extends { __typename?: string }>(
    edges: GraphQLEdges<TNode>,
    typename: T,
): Array<TNode & { __typename: T }> {
    if (!edges) return [];
    return edges
        .filter(isNonNullEdge)
        .filter((edge) => hasTypename(edge.node, typename))
        .map((edge) => edge.node as TNode & { __typename: T });
}
