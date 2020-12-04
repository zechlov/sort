export default class SortFamliy {
    public len: number
    constructor() {
        this.len = 0
    }

    /**
     * 冒泡排序
     */
    public bubbleSort(arr: Array<number>) {
        let len = arr.length
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1 - i; j++) {
                // 相邻俩元素两两对比
                if (arr[j] > arr[j + 1]) {
                    // 元素交换
                    this.swap(arr, j, j + 1)
                }
            }
        }

        return arr
    }

    /**
     * 选择排序
     */
    public selectionSort(arr: Array<number>) {
        let len = arr.length
        let minIndex, temp
        for (let i = 0; i < len - 1; i++) {
            minIndex = i
            for (let j = i + 1; j < len; j++) {
                // 寻找最小的数
                if (arr[j] < arr[minIndex]) {
                    // 保存最小数的索引
                    minIndex = j
                }

            }
            this.swap(arr, minIndex, i)
        }

        return arr
    }

    /**
    * 插入排序
    */
    public insertionSort(arr: Array<number>) {
        let len = arr.length
        let preIndex, current
        for (let i = 0; i < len; i++) {
            preIndex = i - 1
            current = arr[i]
            while (preIndex >= 0 && arr[preIndex] > current) {
                arr[preIndex + 1] = arr[preIndex]
                preIndex--
            }
            arr[preIndex + 1] = current
        }

        return arr
    }

    /**
    * 希尔排序
    */
    public shellSort(arr: Array<number>) {
        let len = arr.length
        let gap = 1
        let temp
        while (gap < len / 3) {
            // 动态定义间隔序列, gap为增量
            gap = gap * 3 + 1
        }
        while (gap >= 1) {
            for (let i = gap; i < len; i++) {
                for (let j = i; j >= gap && arr[j] < arr[j - gap]; j -= gap) {
                    this.swap(arr, j, j - gap)
                }
                gap = (gap - 1) / 3
            }
        }

        return arr
    }

    /*
    归并排序
    */
    public mergeSort(arr: Array<number>) {
        let len = arr.length
        if (len < 2) {
            return arr
        }
        let middle = Math.floor(len / 2),
            left = arr.slice(0, middle),
            right = arr.slice(middle)

        return this.merge(left, right)
    }

    private merge(left: Array<number>, right: Array<number>) {
        let result = []
        while (left.length && right.length) {
            if (left[0] <= right[0]) {
                result.push(left.shift())
            } else {
                result.push(right.shift())
            }
        }

        while (left.length) {
            result.push(left.shift())
        }

        while (right.length) {
            result.push(right.shift())
        }

        return result
    }

    /*
    快速排序
    */
    public quickSort(arr: Array<number>, le: any, ri: any) {
        let len = arr.length,
            partitionIndex,
            left = typeof le != 'number' ? 0 : le,
            right = typeof ri != 'number' ? len - 1 : ri;

        if (left < right) {
            partitionIndex = this.partition(arr, left, right)
            this.quickSort(arr, left, partitionIndex - 1)
            this.quickSort(arr, partitionIndex + 1, right)
        }

        return arr
    }

    private partition(arr: Array<number>, le: any, ri: any) {
        // 分区操作
        // 设定基准值pivot
        let pivot = le,
            index = pivot + 1;
        for (let i = index; i <= ri; i++) {
            if (arr[i] < arr[pivot]) {
                this.swap(arr, i, index)
                index++
            }
        }
        this.swap(arr, pivot, index - 1)
        return index - 1
    }

    // 堆排序
    private buildMaxHeap(arr: Array<number>) {
        // 建立大顶堆
        this.len = arr.length
        for (let i = Math.floor(this.len / 2); i >= 0; i--) {
            this.heapify(arr, i)
        }
    }

    private heapify(arr: Array<number>, i: number) {
        // 堆调整
        let left = 2 * i + 1,
            right = 2 * i + 2,
            largest = i;

        if (left < this.len && arr[left] > arr[largest]) {
            largest = left
        }
        if (right < this.len && arr[right] > arr[largest]) {
            largest = right
        }
        if (largest != i) {
            this.swap(arr, i, largest)
            this.heapify(arr, largest)
        }
    }

    public heapSort(arr: Array<number>) {
        this.buildMaxHeap(arr)

        for (let i = arr.length - 1; i > 0; i--) {
            this.swap(arr, 0, i)
            this.len--
            this.heapify(arr, 0)
        }

        this.len = 0
        return arr
    }

    /**
     * 计数排序
     */
    public countingSort(arr: Array<number>, maxValue: number) {
        let bucket = new Array(maxValue + 1),
            sortedIndex = 0,
            arrLen = arr.length,
            bucketLen = maxValue + 1;

        for (let i = 0; i < arrLen; i++) {
            if (!bucket[arr[i]]) {
                bucket[arr[i]] = 0
            }
            bucket[arr[i]]++
        }

        for (let j = 0; j < bucketLen; j++) {
            while (bucket[j] > 0) {
                arr[sortedIndex++] = j
                bucket[j]--
            }
        }

        return arr
    }

    /**
     * 桶排序
     */
    public bucketSort(arr: Array<number>, bucketSize: number) {
        if (arr.length == 0) return arr
        let i
        let minValue = arr[0]
        let maxValue = arr[0]
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < minValue) {
                // 输入数据最小值
                minValue = arr[i]
            } else if (arr[i] > maxValue) {
                // 输入数据最大值
                maxValue = arr[i]
            }
        }

        // 桶的初始化
        let default_bucket_size = 5 // 设置桶的默认
        bucketSize = bucketSize || default_bucket_size
        let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
        let buckets = new Array(bucketCount)
        for (let i = 0; i < buckets.length; i++) {
            buckets[i] = []
        }

        // 利用映射函数将数据分配到各个桶中
        for (let i = 0; i < arr.length; i++) {
            buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i])
        }

        arr.length = 0
        for (let i = 0; i < buckets.length; i++) {
            // 对每个桶进行排序
            this.insertionSort(buckets[i])
            for (let j = 0; j < buckets[i].length; j++) {
                arr.push(buckets[i][j])
            }
        }

        return arr
    }

    /**
     * 基数排序
     */
    private counter = []
    public radixSort(arr: Array<number>, maxDigit: number) {
        let mod = 10
        let dev = 1
        for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
            for (let j = 0; j < arr.length; j++) {
                let bucket = parseInt((arr[j] % mod) / dev + '')
                if (this.counter[bucket] == null) {
                    this.counter[bucket] = []
                }
                this.counter[bucket].push(arr[j])
            }

            let pos = 0
            for (let j = 0; j < this.counter.length; j++) {
                let value = null
                if (this.counter[j] != null) {
                    while ((value = this.counter[j].shift()) != null) {
                        arr[pos++] = value
                    }
                }
            }
        }

        return arr
    }

    private swap(arr: Array<number>, i: number, j: number) {
        let temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
    }
}
