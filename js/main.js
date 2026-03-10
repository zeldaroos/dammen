document.addEventListener('DOMContentLoaded', function () {
    const dammenObject = document.getElementById('dammen-svg');

    if (!dammenObject) {
        return;
    }

    dammenObject.addEventListener('load', function () {
        const svgDocument = dammenObject.contentDocument;

        if (!svgDocument) {
            return;
        }

        const placesToEnable = [1, 2, 3, 4, 5];

        function setupPlace(placeNumber) {
            const order = [
                'Stängd_näckros_' + placeNumber,
                '_Öppen_näckros_' + placeNumber,
                'Stor_gren_' + placeNumber,
                'Liten_gren_' + placeNumber,
                'Rosfisk_' + placeNumber,
                'Långfisk_' + placeNumber
            ];

            const groups = order
                .map(function (id) {
                    return svgDocument.getElementById(id);
                })
                .filter(Boolean);

            if (!groups.length) {
                return;
            }

            let activeIndex = 0;
            let isHovering = false;

            function render() {
                groups.forEach(function (group, index) {
                    group.style.display = index === activeIndex ? 'inline' : 'none';
                    group.style.cursor = 'pointer';
                    group.style.transition = 'transform 0.2s ease';

                    if (index === activeIndex && isHovering) {
                        group.style.transform = 'translateY(-8px)';
                    } else {
                        group.style.transform = '';
                    }
                });
            }

            function showNext() {
                activeIndex = (activeIndex + 1) % groups.length;
                render();
            }

            groups.forEach(function (group) {
                group.addEventListener('click', showNext);
                group.addEventListener('mouseenter', function () {
                    if (groups[activeIndex] !== group) {
                        return;
                    }

                    isHovering = true;
                    render();
                });
                group.addEventListener('mouseleave', function () {
                    if (groups[activeIndex] !== group) {
                        return;
                    }

                    isHovering = false;
                    render();
                });
            });

            render();
        }

        placesToEnable.forEach(setupPlace);
    });
});
