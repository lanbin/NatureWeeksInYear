(function() {
	window.getWeeks = function($year) {
		var firstDate = new Date($year + "-01-01 00:00:00"),
			lastDate = new Date((parseInt($year) + 1) + "-01-01 00:00:00"),
			DAY_SECOND = 86400000,
			WEEK_SECOND = 604800000,
			daysInWeek = 7,
			firstDay = firstDate.getDay(),
			lastDay = lastDate.getDay(),
			firstDateSecond = 0,
			lastDateSecond = 0,
			weeks = [];

		if (firstDay != 1) {
			var needMore = firstDay - 1;
			firstDateSecond = firstDate.getTime() - needMore * DAY_SECOND;
		}

		if (lastDay != 7) {
			var needMore = 7 - lastDay;
			lastDateSecond = lastDate.getTime() + needMore * DAY_SECOND;
		}

		var weekNum = 1;
		for (var startSecond = firstDateSecond; startSecond < lastDateSecond;) {
			var weekStartAt = formatDay(startSecond);
			startSecond += WEEK_SECOND;
			var weekEndAt = formatDay(startSecond - DAY_SECOND);
			weeks.push([fixNumber(weekNum), weekStartAt + " - " + 　weekEndAt]);
			weekNum++;
		}
		return weeks;
	};

	function formatDay($d) {
		var date = new Date($d),
			m = date.getMonth() + 1,
			d = date.getDate();
		return date.getFullYear() + "/" + fixNumber(m) + "/" + fixNumber(d);
	}

	function fixNumber(n) {
		if (!isNaN(n) && ((n + "").length < 2)) {
			n = "0" + n
		};
		return n;
	}
}());