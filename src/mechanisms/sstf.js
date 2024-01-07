const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function SSTF(queue, head, setChartData, setSeekCount, setCurr_seek, curr_seek) {
    var n = queue.length;
    head = 50;

    if (n <= 0) {
        return { seek_count: 0, arr: [] };
    }

    let seek_time = 0.0;
    var minimum = 0.0;
    var skeek = Array(n + 1).fill(0);
    var auxiliary = Array(n).fill(0).map(() => new Array(n).fill(0));

    var i = 0;
    var j = 0;
    var location = 0;
    for (i = 0; i < n; ++i) {
        auxiliary[i][0] = 0;
        auxiliary[i][1] = 0;
    }

    for (i = 0; i < n; i++) {
        skeek[i] = head;

        for (j = 0; j < n; ++j) {
            auxiliary[j][0] = queue[j] - head;
            if (auxiliary[j][0] < 0) {
                auxiliary[j][0] = -auxiliary[j][0];
            }
        }

        minimum = Number.MAX_VALUE;
        location = -1;

        for (j = 0; j < n; ++j) {
            if (auxiliary[j][1] === 0 && auxiliary[j][0] <= minimum) {
                location = j;
                minimum = auxiliary[j][0];
            }
        }

        auxiliary[location][1] = 1;
        head = queue[location];
        seek_time += auxiliary[location][0];

        // Build seek time string
        if (curr_seek == undefined)
            curr_seek = " ";
        curr_seek += ` |${skeek[i]}-${head}|`;
        if (i + 1 !== n)
            curr_seek += '+';
        setCurr_seek(curr_seek);

        // Update state for animation
       console.log(skeek[i])
        setChartData({ labels: [...Array(i + 2).keys()], arr: [...skeek.slice(0, i + 1)] });
        setSeekCount(seek_time);

        // Introduce a delay for animation
        await delay(1000);
    }

    if (head !== 0) {
        skeek[n] = head;
    }

    let finalArr = [];

    for (i = 1; i <= n; i++) {
        
        finalArr.push(skeek[i]);
        console.log(finalArr[i - 1])
    }

    return { seek_count: seek_time, arr: finalArr };
}
