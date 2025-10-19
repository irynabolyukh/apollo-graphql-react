/**
 * Type guard to filter out null/undefined edges from GraphQL responses
 */
export function isNonNullEdge<T>(edge: { node?: T | null | undefined } | null | undefined): edge is { node: T } {
    return edge !== null && edge !== undefined && edge.node !== null && edge.node !== undefined;
}

/**
 * Type guard to check if a value is non-null and non-undefined
 */
export function isNonNull<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

/**
 * Type guard for GraphQL typename
 */
export function hasTypename<T extends string>(obj: any, typename: T): obj is { __typename: T } {
    return obj?.__typename === typename;
}

/**
 * Extracts nodes from GraphQL edges array with type safety
 * Filters out null/undefined edges and nodes
 */
export function extractEdges<T>(
    edges: ReadonlyArray<{ node?: T | null | undefined } | null | undefined> | null | undefined,
): T[] {
    if (!edges) return [];
    return edges.filter(isNonNullEdge).map((edge) => edge.node);
}

/**
 * Extracts page info from GraphQL response
 * Returns null if not available
 */
export function extractPageInfo<
    T extends {
        hasNextPage?: boolean;
        hasPreviousPage?: boolean;
        startCursor?: string | null;
        endCursor?: string | null;
    },
>(data: { pageInfo?: T | null } | null | undefined): T | null {
    return data?.pageInfo ?? null;
}

/**
 * Extracts total count from GraphQL connection
 */
export function extractTotalCount(data: { totalCount?: number } | null | undefined): number {
    return data?.totalCount ?? 0;
}

/**
 * Maps GraphQL edges with a transform function
 * Automatically filters out null/undefined
 */
export function mapEdges<TNode, TResult>(
    edges: ReadonlyArray<{ node?: TNode | null | undefined } | null | undefined> | null | undefined,
    mapper: (node: TNode) => TResult,
): TResult[] {
    if (!edges) return [];
    return edges
        .filter(isNonNullEdge)
        .map((edge) => mapper(edge.node))
        .filter(isNonNull);
}

/**
 * Filters GraphQL edges by typename and extracts nodes
 */
export function filterEdgesByTypename<T extends string, TNode extends { __typename?: string }>(
    edges: ReadonlyArray<{ node?: TNode | null | undefined } | null | undefined> | null | undefined,
    typename: T,
): Array<TNode & { __typename: T }> {
    if (!edges) return [];
    return edges
        .filter(isNonNullEdge)
        .filter((edge) => hasTypename(edge.node, typename))
        .map((edge) => edge.node as TNode & { __typename: T });
}

/**
 * Creates a type-safe field policy merge function for Apollo cache
 */
export function createEdgesMergePolicy<T = any>() {
    return {
        merge(
            existing: { edges?: T[] } | undefined,
            incoming: { edges?: T[] },
            { args }: { args: Record<string, any> | null },
        ) {
            if (!existing || !args?.after) {
                return incoming;
            }
            return {
                ...incoming,
                edges: [...(existing.edges || []), ...(incoming.edges || [])],
            };
        },
    };
}
