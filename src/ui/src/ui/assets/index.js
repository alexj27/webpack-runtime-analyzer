var Node = require('basis.ui').Node;
var Value = require('basis.data').Value;
var sum = require('basis.data.index').sum;
var dict = require('basis.l10n').dictionary(__filename);

var type = require('app.type');
var Table = require('../table/index');
var TableHead = require('app.ui.table').Head;
var TableRow = require('app.ui.table').Row;
var FileSizeCell = require('app.ui.cells').FileSize;

module.exports = Table.subclass({
    tableId: 'AssetTable',
    sorting: 'data.name',
    dataSource: type.Asset.all,
    childClass: TableRow.subclass({
        template: resource('./template/row.tmpl'),
        binding: {
            name: 'data:',
            fileSizeCell: 'satellite:'
        },
        satellite: {
            fileSizeCell: FileSizeCell.subclass({
                size: Value.query('owner.data.size')
            })
        }
    }),
    satellite: {
        head: TableHead.subclass({
            childNodes: [
                { data: { content: dict.token('name') }, columnId: 'name', sortingRule: 'data.name' },
                { data: { content: dict.token('size') }, columnId: 'size', sortingRule: 'data.size' }
            ]
        }),
        foot: Node.subclass({
            template: resource('./template/foot.tmpl'),
            binding: {
                fileSizeCell: 'satellite:'
            },
            satellite: {
                fileSizeCell: FileSizeCell.subclass({
                    size: sum(Value.query('owner.owner.dataSource'), 'update', 'data.size')
                })
            }
        })
    }
});
