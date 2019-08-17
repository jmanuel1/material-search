import pytest
# There are no selenium type stubs
import selenium.webdriver as webdriver  # type: ignore
import selenium.webdriver.support.ui as ui  # type: ignore
import selenium.webdriver.support.expected_conditions as expects  # type: ignore  # noqa
from selenium.webdriver.common.by import By  # type: ignore
from typing import List, Any, Generator, Iterable
import itertools


@pytest.fixture(scope='module')
def driver() -> Generator[webdriver.Remote, None, None]:
    driver = webdriver.Chrome('./chromedriver')
    yield driver
    driver.quit()


# TODO: what's the WebDriver interface type?
def wait_for_element(element, driver: webdriver.Chrome) -> None:
    wait = ui.WebDriverWait(driver, 10)
    wait.until(expects.visibility_of(element))


def wait_for_element_selector(selector: str, driver: webdriver.Chrome) -> None:
    wait = ui.WebDriverWait(driver, 10)
    expectation = expects.visibility_of_element_located(
        (By.CSS_SELECTOR, selector))
    wait.until(expectation)


def wait_for_element_clickable(element: str, driver: webdriver.Chrome) -> None:
    wait = ui.WebDriverWait(driver, 10)
    wait.until(expects.element_to_be_clickable((By.CSS_SELECTOR, element)))


def wait_for_element_has_text(
    element: str, driver: webdriver.Chrome, text=''
) -> None:
    wait = ui.WebDriverWait(driver, 10)
    selector = (By.CSS_SELECTOR, element)
    expectation = expects.text_to_be_present_in_element(selector, text)
    wait.until(expectation)


def wait_for_elements(elements: List[Any], driver: webdriver.Chrome) -> None:
    map(lambda element: wait_for_element(element, driver), elements)


def wait_for_elements_have_texts(elements: Iterable[Any], texts: Iterable[str], driver: webdriver.Remote) -> None:
    map(lambda args: wait_for_element_has_text(
        args[0], driver, args[1]), zip(elements, texts))


def get_search_result_elements(driver: webdriver.Remote) -> Any:
    resultsSelector = '#search-results paper-card'
    wait_for_element_selector(resultsSelector, driver)
    resultElements = driver.find_elements_by_css_selector(resultsSelector)
    return resultElements


def set_search_bar_text(driver: webdriver.Remote) -> None:
    script = 'document.querySelector("paper-search-bar").query = "search term"'
    driver.execute_script(script)


def test_main_page_title(driver: webdriver.Chrome) -> None:
    driver.get("http://localhost:8000/")
    body = driver.find_element_by_tag_name('body')
    wait_for_element(body, driver)
    pageTitle = driver.title
    assert 'material search' in pageTitle.lower()


def test_app_name_on_page(driver: webdriver.Chrome) -> None:
    driver.get('http://localhost:8000')
    wait_for_element_selector('#app-name', driver)
    appNameElement = driver.find_element_by_id('app-name')
    appName = appNameElement.text
    assert 'material search' in appName.lower()


def test_search_category_tabs_exist(driver: webdriver.Chrome) -> None:
    driver.get('http://localhost:8000')
    tabElements = driver.find_elements_by_tag_name('paper-tab')
    wait_for_elements_have_texts(
        tabElements, ('eb', 'hopping', 'ideos'), driver)
    tabNames = set(map(lambda element: element.text.lower(), tabElements))
    assert tabNames <= {'web', 'shopping', 'videos'}


def test_search_category_tabs_navigate(driver: webdriver.Chrome) -> None:
    driver.get('http://localhost:8000')
    tabElements = driver.find_elements_by_tag_name('paper-tab')
    wait_for_elements_have_texts(tabElements, itertools.cycle(['']), driver)
    for element in tabElements:
        assert element.get_attribute('href') is not None


def test_search_bar_present(driver: webdriver.Chrome) -> None:
    driver.get('http://localhost:8000')
    body = driver.find_element_by_tag_name('body')
    wait_for_element(body, driver)
    searchElement = driver.find_element_by_tag_name('paper-search-bar')
    assert searchElement is not None


def test_results_appear_after_typing_in_search_bar(
    driver: webdriver.Chrome
) -> None:
    driver.get('http://localhost:8000')
    searchElement = driver.find_element_by_css_selector('paper-search-bar')
    wait_for_element(searchElement, driver)
    set_search_bar_text(driver)
    resultElements = get_search_result_elements(driver)
    assert resultElements


def test_search_results_have_content(driver: webdriver.Chrome) -> None:
    driver.get('http://localhost:8000')
    searchElement = driver.find_element_by_css_selector('paper-search-bar')
    wait_for_element(searchElement, driver)
    set_search_bar_text(driver)
    resultElements = get_search_result_elements(driver)
    wait_for_elements_have_texts(resultElements, itertools.cycle(['']), driver)
    for element in resultElements:
        assert len(element.text) > 0
