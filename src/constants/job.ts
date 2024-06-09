import { SUCCEED } from "./status-code"

export const TASK_CRAWL_KEY = {
    TGDD_CATEGORY: 'tgdd_crawl_category',
    TGDD_END_PAGE_LINK: 'tgdd_crawl_end_page_link',
    TGDD_PRODUCT_LINK: 'tgdd_crawl_product_link',
    TGDD_DESCRIPTION: 'tgdd_crawl_description'
}

export const TASK_CRAWL_KEY_LABEL = {
    [TASK_CRAWL_KEY.TGDD_CATEGORY]: 'Crawl category',
    [TASK_CRAWL_KEY.TGDD_END_PAGE_LINK]: 'Crawl end page link',
    [TASK_CRAWL_KEY.TGDD_PRODUCT_LINK]: 'Crawl product link',
    [TASK_CRAWL_KEY.TGDD_DESCRIPTION]: 'Crawl product description'
}

export const STATUS = {
    SUCCESS: 'SUCCESS',
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    FAILED: 'FAILED'
}

export const STATUS_LABEL = {
    [STATUS.SUCCESS]: 'success',
    [STATUS.PENDING]: 'warning',
    [STATUS.IN_PROGRESS]: 'primary',
    [STATUS.FAILED]: 'danger'
}