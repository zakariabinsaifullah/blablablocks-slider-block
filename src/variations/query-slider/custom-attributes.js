export const customAttributes = {
    slidesPerView: {
        type: "object",
        default: {
            desktop: 1,
            tablet: 1,
            mobile: 1,
            activeDevice: "desktop"
        },
        properties: {
            desktop: {
                type: "integer"
            },
            tablet: {
                type: "integer"
            },
            mobile: {
                type: "integer"
            },
            activeDevice: {
                type: "string"
            }
        }
    },
    slidesSpacing: {
        type: "object",
        default: {
            desktop: 30,
            tablet: 20,
            mobile: 10,
            activeDevice: "desktop"
        },
        properties: {
            desktop: {
                type: "integer"
            },
            tablet: {
                type: "integer"
            },
            mobile: {
                type: "integer"
            },
            activeDevice: {
                type: "string"
            }
        }
    },
    speed: {
        type: "integer",
        default: 300
    },
    effects: {
        type: "string",
        default: "slide"
    },
    autoplay: {
        type: "boolean",
        default: false
    },
    delay: {
        type: "integer",
        default: 5000
    },
    navigation: {
        type: "object",
        default: {
            desktop: false,
            tablet: false,
            mobile: false,
            activeDevice: "desktop"
        },
        properties: {
            desktop: {
                type: "boolean"
            },
            tablet: {
                type: "boolean"
            },
            mobile: {
                type: "boolean"
            },
            activeDevice: {
                type: "string"
            }
        }
    },
    pagination: {
        type: "object",
        default: {
            desktop: false,
            tablet: false,
            mobile: false,
            activeDevice: "desktop"
        },
        properties: {
            desktop: {
                type: "boolean"
            },
            tablet: {
                type: "boolean"
            },
            mobile: {
                type: "boolean"
            },
            activeDevice: {
                type: "string"
            }
        }
    },
    loop: {
        type: "boolean",
        default: false
    },
    navigationColor: {
        type: "object",
        properties: {
            arrowColor: {
                type: "object",
                properties: {
                    default: {
                        type: "string"
                    },
                    hover: {
                        type: "string"
                    }
                }
            },
            backgroundColor: {
                type: "object",
                properties: {
                    default: {
                        type: "string"
                    },
                    hover: {
                        type: "string"
                    }
                }
            }
        }
    },
    navigationPadding: {
        type: "object"
    },
    navigationSize: {
        type: "string"
    },
    navigationSpacing: {
        type: "object"
    },
    navigationOffset: {
        type: "object"
    },
    navigationPosition: {
        type: "string"
    },
    navigationBorderRadius: {
        type: "string"
    },
    paginationSize: {
        type: "string"
    },
    paginationOffset: {
        type: "object"
    },
    paginationPosition: {
        type: "string"
    },
    paginationColor: {
        type: "object",
        properties: {
            activeColor: {
                type: "object",
                properties: {
                    default: {
                        type: "string"
                    }
                }
            },
            inactiveColor: {
                type: "object",
                properties: {
                    default: {
                        type: "string"
                    }
                }
            }
        }
    }
};