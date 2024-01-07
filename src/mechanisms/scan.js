const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function SCAN(arr, head, direction, setChartData, setSeekCount, setCurr_seek, curr_seek) {
    let seek_count = 0;
    let distance, cur_track;
    let left = [];
    let right = [];
    let seek_sequence = [];

    if (direction === "left") left.push(0);
    else if (direction === "right") right.push(199);

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < head) left.push(arr[i]);
        if (arr[i] > head) right.push(arr[i]);
    }

    // Sorting left and right vectors
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    // Run the while loop two times: one by one scanning right and left of the head
    let run = 2;
    while (run-- > 0) {
        if (direction === "left") {
            for (let i = left.length - 1; i >= 0; i--) {
                cur_track = left[i];

                // Appending current track to seek sequence
                seek_sequence.push(cur_track);

                // Calculate absolute distance
                distance = Math.abs(cur_track - head);

                // Increase the total count
                seek_count += distance;
                if (curr_seek == undefined)
                    curr_seek = " ";
                if (right[i + 1] !== undefined) {
                    curr_seek += ` |${head}-${left[i]}|`;
                    if(i !== 0)
                        curr_seek += '+';
        }

                // Accessed track is now the new head
                head = cur_track;

                // Build seek time string
                
                setCurr_seek(curr_seek);

                // Update state for animation
                setChartData({ labels: [...Array(seek_sequence.length).keys()], arr: [...seek_sequence] });
                setSeekCount(seek_count);

                // Introduce a delay for animation
                await delay(1000);
            }
            direction = "right";
        } else if (direction === "right") {
            for (let i = 0; i < right.length; i++) {
                cur_track = right[i];

                // Appending current track to seek sequence
                seek_sequence.push(cur_track);

                // Calculate absolute distance
                distance = Math.abs(cur_track - head);

                // Increase the total count
                seek_count += distance;
                if (curr_seek == undefined)
                curr_seek = " ";
                if (right[i + 1] !== undefined) {
                    curr_seek += ` |${head}-${right[i]}|`;
                    if(i !== right.length - 1)
                        curr_seek += '+';
                }

                // Accessed track is now new head
                head = cur_track;

                // Build seek time string
                setCurr_seek(curr_seek);

                // Update state for animation
                setChartData({ labels: [...Array(seek_sequence.length).keys()], arr: [...seek_sequence] });
                setSeekCount(seek_count);

                // Introduce a delay for animation
                await delay(1000);
            }
            direction = "left";
        }
    }

    return { seek_count, arr: seek_sequence };
}
