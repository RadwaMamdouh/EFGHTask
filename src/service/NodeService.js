export const NodeService = {
    getTreeTableNodesData() {
        return [
            {
                key: '0',
                data: {
                    name: 'Totals',
                    securityName: '',
                    val: 2000,
                },
                children: [
                    {
                        key: '0-0',
                        data: {
                            name: 'Cash',
                            securityName: '',
                            val: 1000,
                        },
                        children: [
                            {
                                key: '0-0-0',
                                data: {
                                    name: 'Cash (EGP)',
                                    securityName: '',
                                    val: 500,
                                }
                            },
                            {
                                key: '0-0-1',
                                data: {
                                    name: 'Cash (USD)',
                                    securityName: '',
                                    val: 500,
                                }
                            },
                        ]
                    },
                    {
                        key: '0-1',
                        data: {
                            name: 'Equity',
                            securityName: '',
                            val: 1000,
                        },
                        children: [
                            {
                                key: '0-1-0',
                                data: {
                                    name: 'EQ 1',
                                    securityName: 'Security Name 1',
                                    val: 500,
                                }
                            },
                            {
                                key: '0-1-1',
                                data: {
                                    name: 'EQ 2',
                                    securityName: 'Security Name 2',
                                    val: 500,
                                }
                            },
                        ]
                    },
                ]
            },
        ];
    },

    getTreeTableNodes() {
        return Promise.resolve(this.getTreeTableNodesData());
    },
}
