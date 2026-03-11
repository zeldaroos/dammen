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

        function setupWaveMotion() {
            const waves = Array.from({ length: 9 }, function (_, index) {
                return svgDocument.getElementById('Våg_' + (index + 1));
            }).filter(Boolean);

            const pol = svgDocument.getElementById('Pöl');

            if (!waves.length && !pol) {
                return;
            }

            const amplitudePx = 3;
            const polCycleDurationMs = 2000;
            const polScaleAmplitude = 0.025;

            waves.forEach(function (wave) {
                wave.style.opacity = '1';
                wave.style.transformBox = 'fill-box';
                wave.style.transformOrigin = 'center';
            });

            if (pol) {
                pol.style.transformBox = 'fill-box';
                pol.style.transformOrigin = 'center';
            }

            function animate(timestamp) {
                const basePhase = (timestamp / polCycleDurationMs) * Math.PI * 2;

                waves.forEach(function (wave, index) {
                    const phase = basePhase + index * 0.6;
                    const offsetX = Math.sin(phase) * amplitudePx;
                    wave.style.transform = 'translateX(' + offsetX.toFixed(3) + 'px)';
                });

                if (pol) {
                    const scale = 0.995 + Math.sin(basePhase) * 0.005;
                    pol.style.transform = 'scale(' + scale.toFixed(4) + ')';
                }

                window.requestAnimationFrame(animate);
            }

            window.requestAnimationFrame(animate);
        }

        placesToEnable.forEach(setupPlace);
        setupWaveMotion();
    });
});
