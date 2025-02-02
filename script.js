document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".image-section");
    let scrollCount = 0;
    let lastScrollTop = 0;

    function checkScroll() {
        const currentScrollTop = window.scrollY;

        // 스크롤 방향 확인 및 카운트
        if (currentScrollTop > lastScrollTop) {
            // 스크롤 다운
            scrollCount++;
        }
        lastScrollTop = currentScrollTop;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const mainImage = section.querySelector(".main-image");
            const popImages = section.querySelectorAll(".pop-image");

            // 메인 이미지가 화면의 60% 위치에 도달했을 때
            if (rect.top < window.innerHeight * 0.6) {
                mainImage.classList.add("active");

                // 첫 번째 섹션의 경우
                if (index === 0) {
                    if (scrollCount >= 2) {
                        // 스크롤을 2번 이상 했을 때
                        popImages.forEach((img) => img.classList.add("active"));
                    } else {
                        popImages.forEach((img) =>
                            img.classList.remove("active")
                        );
                    }
                }
                // 7번째 섹션(index 6)의 경우
                else if (index === 6) {
                    if (rect.top < window.innerHeight * 0.35) {
                        popImages.forEach((img, i) => {
                            if (i === 0) {
                                img.classList.add("active");
                            } else {
                                setTimeout(() => {
                                    img.classList.add("active");
                                }, 500);
                            }
                        });
                    } else {
                        popImages.forEach((img) =>
                            img.classList.remove("active")
                        );
                    }
                }
                // 나머지 섹션들
                else if (popImages.length > 0 && index < sections.length - 1) {
                    if (rect.top < window.innerHeight * 0.35) {
                        popImages.forEach((img) => img.classList.add("active"));
                    } else {
                        popImages.forEach((img) =>
                            img.classList.remove("active")
                        );
                    }
                }
            } else {
                mainImage.classList.remove("active");
                if (popImages.length > 0) {
                    popImages.forEach((img) => img.classList.remove("active"));
                }
            }
        });
    }

    // 페이지 로드 시 첫 번째 메인 이미지만 보이도록 설정
    const firstMainImage = sections[0].querySelector(".main-image");
    firstMainImage.classList.add("active");

    // 스크롤 이벤트에 쓰로틀링 적용
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    checkScroll();

    // PC 버전 fullpage 초기화 (기존 코드 유지)
    if (window.innerWidth > 1024) {
        new fullpage("#fullpage", {
            // ... 기존 설정 유지
        });
    }

    // 모바일/태블릿 버전 버튼 이벤트
    if (window.innerWidth <= 1024) {
        const surveyButton = document.querySelector(".survey-button");
        const footer = document.querySelector("footer");
        let isButtonMoved = false;

        window.addEventListener("scroll", () => {
            const footerRect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (footerRect.top <= windowHeight && !isButtonMoved) {
                // 푸터가 뷰포트에 보이면 버튼을 30vh 위치로 이동
                surveyButton.style.bottom = "70vh"; // 화면 높이의 30vh 위치로
                isButtonMoved = true;
            } else if (footerRect.top > windowHeight && isButtonMoved) {
                // 푸터가 뷰포트에서 벗어나면 원래 위치로
                surveyButton.style.bottom = "15vh";
                isButtonMoved = false;
            }
        });
    }
});
