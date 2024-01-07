const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function FCFS(arr, head, setChartData, setSeekCount, setCurr_seek, curr_seek) {
    let size = arr.length;
    let seek_times = [];
    let distance, cur_track;

    if (size === 0) {
        console.error("Error: Empty request array.");
        return { seek_times, arr };
    }

    // Initial data for the chart
    setChartData({ labels: [1], arr: [head] });

    for (let i = 0; i < size; i++) {
        console.log(arr[i])
        cur_track = arr[i];

        if (isNaN(cur_track)) {
            console.error(`Error: Invalid track at index ${i}.`);
            return { seek_times, arr };
        }

        // Calculate absolute distance
        distance = Math.abs(cur_track - head);

        // Increase the total count
        seek_times.push(distance);
        if (curr_seek == undefined)
            curr_seek = " ";
        
        curr_seek += ` |${head}-${cur_track}|`;
        if (i + 1 != size)
            curr_seek += '+';
        setCurr_seek(curr_seek);
        // Accessed track is now new head
        head = cur_track;

        console.log([...arr.slice(0, i + 1)])
        // Update state for animation
        setChartData({ labels: [...Array(i + 2).keys()], arr: [...arr.slice(0, i + 1)] });
        setSeekCount(seek_times.reduce((total, time) => total + time, 0));
        

        await delay(1000);
    }

    return { seek_times, arr };
}
