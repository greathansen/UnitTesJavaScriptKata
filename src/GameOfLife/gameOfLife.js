GameOfLife = {}

$(document).ready(function () {
    GameOfLife.Initialize();
});

GameOfLife = {

    Initialize: function () {
        this.Generation = 0;
        this.neighbourHoodWidth = 20;
        this.neighbourHoodHeight = 22;
        this.CreateNeighbourHood();

        $('#btnNextGeneration').click(this.NextGeneration);

        $('#btnClear').click(function () {
            GameOfLife.Generation = 0;
            $('.cell').removeClass('liveCell')
            $('#lblGenerationNumber').html('&nbsp;' + GameOfLife.Generation);
        });
    },

    CreateNeighbourHood: function () {

        for (var i = 0; i < this.neighbourHoodHeight; i++) {

            var tdToAppend = '';
            for (var j = 0; j < this.neighbourHoodWidth; j++) {
                tdToAppend = tdToAppend + '<td id="cell_' + i + '_' + j + '" class="cell"></td>';
            }

            $('#neighbourHood').append('<tr>' + tdToAppend + '</tr>');
        }

        $('.cell').click(this.ChangeStatusOnACell);
    },

    NextGeneration: function () {
        GameOfLife.Generation = GameOfLife.Generation + 1;
        $('#lblGenerationNumber').html('&nbsp;' + GameOfLife.Generation);

        GameOfLife.ApplyRules();
    },

    ChangeStatusOnACell: function (cell) {

        if ($(this).hasClass('liveCell')) {
            $(this).removeClass('liveCell');
        }
        else {
            $(this).addClass('liveCell');
        }
    },

    ApplyRules: function () {

        var cellsToUpdate = [];
        var j = 0;

        $.each($('.cell'), function (i, cell) {

            var numberOfNeighbors = GameOfLife.CalculateNumberOfNeighbors(cell);

            if (numberOfNeighbors == 3) {
                if (!$(cell).hasClass('liveCell')) {
                    cellsToUpdate[j] = $(cell);
                    j++;
                }
            }
            else if (numberOfNeighbors != 2) {
                if ($(cell).hasClass('liveCell')) {
                    cellsToUpdate[j] = $(cell);
                    j++;
                }
            }
        });

        $.each(cellsToUpdate, function (i, cell) {
            if ($(cell).hasClass('liveCell')) { $(cell).removeClass('liveCell'); }
            else { $(cell).addClass('liveCell'); }
        })
    },

    CalculateNumberOfNeighbors: function (cell) {
        var id = $(cell).attr('id').split('_');
        var horizontalId = parseInt(id[1], 0);
        var verticalId = parseInt(id[2], 0);
        var numberOfNeighbors = 0;

        if ($('#cell_' + horizontalId + '_' + parseInt(verticalId - 1, 0)).hasClass('liveCell')) {
            numberOfNeighbors = numberOfNeighbors + 1;
        }
        if ($('#cell_' + horizontalId + '_' + parseInt(verticalId + 1, 0)).hasClass('liveCell')) {
            numberOfNeighbors = numberOfNeighbors + 1;
        }
        if ($('#cell_' + parseInt(horizontalId - 1, 0) + '_' + verticalId).hasClass('liveCell')) {
            numberOfNeighbors = numberOfNeighbors + 1;
        }
        if ($('#cell_' + parseInt(horizontalId + 1, 0) + '_' + verticalId).hasClass('liveCell')) {
            numberOfNeighbors = numberOfNeighbors + 1;
        }

        if ($('#cell_' + parseInt(horizontalId + 1, 0) + '_' + parseInt(verticalId + 1, 0)).hasClass('liveCell')) {
            numberOfNeighbors = numberOfNeighbors + 1;
        }
        if ($('#cell_' + parseInt(horizontalId - 1, 0) + '_' + parseInt(verticalId - 1, 0)).hasClass('liveCell')) {
            numberOfNeighbors = numberOfNeighbors + 1;
        }
        if ($('#cell_' + parseInt(horizontalId - 1, 0) + '_' + parseInt(verticalId + 1, 0)).hasClass('liveCell')) {
            numberOfNeighbors = numberOfNeighbors + 1;
        }
        if ($('#cell_' + parseInt(horizontalId + 1, 0) + '_' + parseInt(verticalId - 1, 0)).hasClass('liveCell')) {
            numberOfNeighbors = numberOfNeighbors + 1;
        }
        return numberOfNeighbors;
    }
}