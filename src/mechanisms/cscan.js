const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function CSCAN(arr, head, direction, setChartData, setSeekCount, setCurr_seek, curr_seek) {
    let seek_count = 0;
    let distance, cur_track;
    let left = [];
    let right = [];
    let seek_sequence = [];

    // Appending end values which have to be visited before reversing the direction
    left.push(0);
    right.push(199);

    // Tracks on the left of the head will be serviced when once the head comes back to the beginning (left end).
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < head) left.push(arr[i]);
        if (arr[i] > head) right.push(arr[i]);
    }

    // Sorting left and right vectors
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    // First service the requests on the right side of the head.
    for (let i = 0; i < right.length; i++) {
        cur_track = right[i];

        // Appending current track to seek sequence
        seek_sequence.push(cur_track);

        // Calculate absolute distance
        distance = Math.abs(cur_track - head);

        // Increase the total count
        seek_count += distance;

        // Accessed track is now the new head
        head = cur_track;

        // Build seek time string
        if (curr_seek == undefined)
            curr_seek = " ";
        if (right[i + 1] != undefined) {
            curr_seek += ` |${head}-${right[i+1]}|`;
            curr_seek += '+';
        }
 
        setCurr_seek(curr_seek);

        // Update state for animation
        setChartData({ labels: [...Array(seek_sequence.length).keys()], arr: [...seek_sequence] });
        setSeekCount(seek_count);

        // Introduce a delay for animation
        await delay(1000);
    }

    // Once reached the right end, jump to the beginning.
    head = 0;

    // Adding seek count for head returning from 199 to 0
    seek_count += 199;

    // Now service the requests again which are left.
    for (let i = 0; i < left.length; i++) {
        cur_track = left[i];

        // Appending current track to seek sequence
        seek_sequence.push(cur_track);

        // Calculate absolute distance
        distance = Math.abs(cur_track - head);

        // Increase the total count
        seek_count += distance;

        // Accessed track is now the new head
        head = cur_track;

        // Build seek time string
        curr_seek += ` |${head}-${cur_track}|`;
        if (i !== left.length - 1)
            curr_seek += '+';
        setCurr_seek(curr_seek);

        // Update state for animation
        setChartData({ labels: [...Array(seek_sequence.length).keys()], arr: [...seek_sequence] });
        setSeekCount(seek_count);

        // Introduce a delay for animation
        await delay(1000);
    }

    return { seek_count, arr: seek_sequence };
}
