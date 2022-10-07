

const isValidate = function (vgName) {
    var x = DevExpress.validationEngine.validateGroup(vgName);
    if (x.isValid) {
        return true;
    } else {
        showIndicator('Validation error', 'error');
        return false;
    }
}
const editConfirm = function (title, msg, btnType) {
    var myDialog = DevExpress.ui.dialog.custom({
        title: title,
        //width:'25%',
        messageHtml: "<b class='h4'>" + msg + "</b>",
        buttons: [{
            text: "No",
            type: 'normal',
            onClick: function (e) {
                return false;
            }
        }, {
            text: "Yes",
            type: btnType,
            onClick: function (e) {
                return true;
            }
        },
        ]
    });
    return myDialog;
}
const showIndicator = function (msg, status) {
    DevExpress.ui.notify({ message: msg, position: { my: 'center top', at: 'center top', }, }, status, 3000);
}
const serverErrorHandler = function (errorRes, header) {
    try {
        var msg = header + ' : ' + HttpServerRequestStatus.find(item => item.status == errorRes).message;
        showIndicator(msg, 'warning');
    } catch (e) {
        showIndicator('connection refused', 'warning');
    }
};
class basicContainer {
    data = [];
    dataGrid = {
        activeStateEnabled: true,
        focusStateEnabled: true,
        hoverStateEnabled: true,
        keyExpr: 'ID',
        showBorders: true,
        paging: {
            pageSize: 10,
        },
        pager: {
            visible: true,
            allowedPageSizes: [10, 30, 50, 'all'],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true,
        },
        filterRow: { visible: true },
        headerFilter: { visible: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: 'Search...',
        },
        showColumnLines: true,
        showRowLines: true,
        columnMinWidth: 50,
        columnAutoWidth: true,
        columnHidingEnabled: true,
        remoteOperations: true,
        filterRow: {
            visible: true,
        },
        editing: {
            mode: 'row',
            allowUpdating: false,
            allowAdding: false,
            allowDeleting: false,
            useIcons: true,
        },
        columnChooser: {
            enabled: true,
            mode: 'select',
        },
    };
    popup = {
        //wigth: 100,
        //height: 400,
        copyRootClassesToWrapper: true,
        closeOnOutsideClick: false,
        deferRendering: false,
        position: 'center',
        dragOutsideBoundary: true,
        resizeEnabled: true,
        restorePosition: true,
        shading: true,
        shadingColor: 'rgba(0,0,0,0.5)',
        showTitle: true,
        title: 'Title',
    }
    validation = {};
    constructor(ngName) {
        if (ngName != null || ngName != undefined) {
            this.validation = {
                validationGroup: ngName,
                validationRules: [{
                    type: 'required',
                    message: 'Is required',
                }],
            }
        }

    }
};
class management {
    treeListInit = null;
    popupInit = 1;
    showPopup = false;
    constructor() {
        var ei = this;
        this.popup.onInitialized = function (e) {
            ei.popupInit = e.component;            
        }        
    };
    popup = {
        copyRootClassesToWrapper: true,
        closeOnOutsideClick: false,
        deferRendering: false,
        position: 'center',
        dragOutsideBoundary: true,
        resizeEnabled: true,
        restorePosition: true,
        fullScreen: true,
        shading: true,
        shadingColor: 'rgba(0,0,0,0.5)',
        showTitle: true,
        toolbarItems: [{
                location: 'before',
                //text: 'My Name is obai',
                template(e) {
                    return '<span class="dx-dashboard-ellipsis">'+e.text+'</span>';
                },
            },
        ]
    };    
}
class submitForm {
    docName = null;
    userId = null;
    popupInit = 1;
    fromLevelInit = 0;
    toLevelInit = 0;
    statusBoxInit = 0;
    popup = {
        copyRootClassesToWrapper: true,
        closeOnOutsideClick: false,
        deferRendering: false,
        position: 'center',
        dragOutsideBoundary: true,
        resizeEnabled: true,
        restorePosition: true,
        fullScreen: true,
        shading: false,
        shadingColor: 'rgba(0,0,0,0.5)',
        showTitle: true,
        toolbarItems: [{
            location: 'before',
            template(e) {
                return '<span class="dx-dashboard-ellipsis">' + e.text + '</span>';
            },
        },
        ]
    };
    validation = {};
    constructor(ngName, user, docName) {
        this.docName = docName;
        this.userId = user;
        if (ngName != null || ngName != undefined) {
            this.validation = {
                validationGroup: ngName,
                validationRules: [{
                    type: 'required',
                    message: 'Is required',
                }],
            }
        }
        var ei = this;
        this.popup.onInitialized = function (e) {
            ei.popupInit = e.component;
        };
        this.fromLevel.onInitialized = function (e) {
            ei.fromLevelInit = e.component;
        };
        this.toLevel.onInitialized = function (e) {
            ei.toLevelInit = e.component;
        };
        this.statusBox.onInitialized = function (e) {
            ei.statusBoxInit = e.component;
        };
        this.commentBox.onInitialized = function (e) {
            ei.commentBoxInit = e.component;
        };
    }
    fromLevel = {
        readOnly: true,
    };
    toLevel = {
        displayExpr: 'NAME',
        valueExpr: 'ID',
    };
    statusBox = {
        displayExpr: 'NAME',
        valueExpr: 'ID',
        itemTemplate(data, index, element) {
            return "<span>" + data.NAME + " <span class='" + data.icon + "'></span></span>";
        },
    };
    commentBox = {
        height: 80,
        showClearButton: true,
    };
    commentDxList = {
        allowItemDeleting: false,
        activeStateEnabled: false,
        focusStateEnabled: false,
        itemDeleteMode: 'swipe',
        menuMode: "context",
        selectionMode: "single",
        searchMode: "contains",
        scrollByContent: true,
        scrollByThumb: true,
        scrollingEnabled: true,
        nextButtonText: "More",
        height: 400,
    };
    setStatus(id) {
        var tmp = [];
        if (id == 1) {
            tmp.push({ ID: '1', NAME: "Submit", icon: 'fa fa-check' });
        } else if (id > 1) {
            tmp.push(
                { ID: '1', NAME: "Submit", icon: 'fa fa-check' },
                { ID: '2', NAME: "Rework", icon: 'fa fa-refresh' },
                { ID: '3', NAME: "Reject", icon: 'fa fa-times' },
            );
        }
        return tmp;
    }
    setLevels(id) {
        var tmp = [];
        if (id == 1) {
            tmp.push({ ID: '0', NAME: "Next Level", icon: 'fa fa-check' });
        } else if (id > 1) {
            for (var i = id - 1; i > 0; i--)
                tmp.push(
                    { ID: i - 1, NAME: "Level " + i, icon: 'fa fa-chevron-right' },
                );
        }
        return tmp;
    }
}
class comment {
    popupInit = 1;
    commentBoxInit = 1;
    popup = {
        copyRootClassesToWrapper: true,
        closeOnOutsideClick: false,
        deferRendering: false,
        position: 'center',
        dragOutsideBoundary: true,
        resizeEnabled: true,
        restorePosition: true,
        fullScreen: true,
        shading: true,
        shadingColor: 'rgba(0,0,0,0.5)',
        showTitle: true,
        toolbarItems: [{
            location: 'before',
            template(e) {
                return '<span class="dx-dashboard-ellipsis">' + e.text + '</span>';
            },
        },
        ]
    };
    validation = {};
    constructor(ngName) {
        if (ngName != null || ngName != undefined) {
            this.validation = {
                validationGroup: ngName,
                validationRules: [{
                    type: 'required',
                    message: 'Is required',
                }],
            }
        }
        var ei = this;
        this.popup.onInitialized = function (e) {
            ei.popupInit = e.component;
        };
        this.commentBox.onInitialized = function (e) {
            ei.commentBoxInit = e.component;
        };
    };
    commentBox = {
        height: 80,
        showClearButton: true,
    };
    commentDxList = {
        allowItemDeleting: false,
        activeStateEnabled: false,
        focusStateEnabled: false,
        itemDeleteMode: 'swipe',
        menuMode: "context",
        selectionMode: "single",
        searchMode: "contains",
        scrollByContent: true,
        scrollByThumb: true,
        scrollingEnabled: true,
        nextButtonText: "More",
        height: 400,
    };
}
class fetchDocument {
    popupInit = 1;
    commentBoxInit = 0;
    fileLoaderInit = 0;
    validation = {};
    constructor(ngName) {
        if (ngName != null || ngName != undefined) {
            this.validation = {
                validationGroup: ngName,
                validationRules: [{
                    type: 'required',
                    message: 'Is required',
                }],
            }
        }
        var ei = this;
        this.popup.onInitialized = function (e) {
            ei.popupInit = e.component;
        };
        this.commentBox.onInitialized = function (e) {
            ei.commentBoxInit = e.component;
        };
        this.fileLoader.onInitialized = function (e) {
            ei.fileLoaderInit = e.component;
        };
        this.docType.onInitialized = function (e) {
            ei.docTypeInit = e.component;
        };
    };
    docType = {
        displayExpr: 'NAME',
        valueExpr: 'ID',
        placeholder: 'Document Type',
    }
    popup = {
        copyRootClassesToWrapper: true,
        closeOnOutsideClick: false,
        deferRendering: false,
        position: 'center',
        dragOutsideBoundary: true,
        resizeEnabled: true,
        restorePosition: true,
        fullScreen: true,
        shading: true,
        shadingColor: 'rgba(0,0,0,0.5)',
        showTitle: true,
        toolbarItems: [{
            location: 'before',
            template(e) {
                return '<span class="dx-dashboard-ellipsis">' + e.text + '</span>';
            },
        },
        ]
    };
    commentBox = {
        height: 60,
        showClearButton: true,
    };
    fileLoader = {
        hoverStateEnabled: true,
        focusStateEnabled: true,
        activeStateEnabled: true,
        selectButtonText: 'Select Document',
        labelText: '',
        accept: '*',
        uploadMode: 'useForm',
        maxFileSize: 15728640,
        minFileSize: 1,
    }
    dataGrid = {
        height: 400,
        activeStateEnabled: true,
        focusStateEnabled: true,
        hoverStateEnabled: true,
        keyExpr: 'ID',
        showBorders: true,
        paging: {
            pageSize: 10,
        },
        pager: {
            visible: true,
            allowedPageSizes: [10, 30, 50, 'all'],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true,
        },
        filterRow: { visible: true },
        headerFilter: { visible: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: 'Search...',
        },
        showColumnLines: false,
        showRowLines: true,
        columnMinWidth: 50,
        columnAutoWidth: true,
        columnHidingEnabled: true,
        remoteOperations: true,
        filterRow: {
            visible: true,
        },
        editing: {
            mode: 'row',
            allowUpdating: false,
            allowAdding: false,
            allowDeleting: false,
            useIcons: true,
        },
        columnChooser: {
            enabled: true,
            mode: 'select',
        },
        columns: [
            {
                dataField: 'ID',
                dataType: 'number',
                allowEditing: false,
                width: 80,
                alignment: 'center',
                visible: false,
            }, {
                dataField: 'SNUMBER',
                caption: 'S.N',
                allowEditing: false,
                sortOrder: "desc",
                width: 100,
                alignment: 'center',
                //visible: false,
            }, {
                dataField: 'REMARKS',
            },
            {
                dataField: 'DOC_TYPE_NAME',
                caption: 'DOC TYPE',
            },
            {
                dataField: 'UNIQUE_NAME',
                caption: 'Download',
                width: 120,
                cellTemplate(container, options) {
                    $(container).append('<a href="/TrnDocuments/' + options.row.data.UNIQUE_NAME + '"  target="_blank" download><span class="glyphicon glyphicon-download-alt"></span></a>');
                },
                alignment: 'center',
            }, {
                dataField: 'UNIQUE_NAME',
                caption: 'Open',
                width: 120,
                cellTemplate(container, options) {
                    $(container).append('<a href="/TrnDocuments/' + options.row.data.UNIQUE_NAME + '"  target="_blank" ><span class="dx-icon-folder"></span></a>');
                },
                alignment: 'center',
            }, {
                dataField: 'CREATED_AT',
                caption: 'Date',
                dataType: 'date',
                format: 'dd-MM-yyyy',
                alignment: 'center',
                width: 200,
            },
        ],
    };
}
class report {
    docName = null;
    userId = null;
    data = [];
    constructor(docName, user) {
        this.docName = docName;
        this.userId = user;
    }
    filter(filter, key, value) {
        var pointer = 0;
        var tail = 0;
        while (pointer > - 1) {
            pointer = filter.indexOf('%' + key + '%', tail);
            if (pointer > -1) {
                filter = filter.replace('%' + key + '%', value);
            }
            tail = pointer + 1;
        }
        return filter;
    }
}
const filterProcess = function (filter, key, value) {
    var pointer = 0;
    var tail = 0;
    while (pointer > - 1) {
        pointer = filter.indexOf('%' + key + '%', tail);
        if (pointer > -1) {
            filter = filter.replace('%' + key + '%', value);
        }
        tail = pointer + 1;
    }
    return filter;
}
localStorage.setItem("UserId", 141);
localStorage.setItem("OrganizationId", 1);
localStorage.setItem("UnitId", 64);
const newPopup = function () {
    return {
        wigth: 100,
        height: 400,
        copyRootClassesToWrapper: true,
        closeOnOutsideClick: false,
        deferRendering: false,
        position: 'center',
        dragOutsideBoundary: true,
        resizeEnabled: true,
        restorePosition: true,
        shading: true,
        shadingColor: 'rgba(0,0,0,0.5)',
        showTitle: true,
        title: 'Title',
    }
}
const setInsertDefaultParams = function (model) {
    model.IS_DELETED = false;
    model.IS_UPDATED = false;
    model.DELETED_BY = 0;
    model.UPDATED_BY = 0;
    model.CREATED_BY = 1;
    //model.ORG_ID = localStorage.getItem("OrganizationId");
    //model.COMP_ID = localStorage.getItem("UnitId");
    return model;
}
const setUpdatetDefaultParams = function (model) {
    model.IS_DELETED = false;
    model.IS_UPDATED = true;
    model.UPDATED_BY = 1;
    return model;
}
const setDeleteDefaultParams = function (model) {
    model.IS_DELETED = true;
    model.IS_UPDATED = false;
    model.DELETED_BY = 1;
    return model;
}
const gender = [{ id: 1, name: 'male' }, { id: 2, name: 'female' }];
const phoneTypes = [{ id: 1, name: 'Personal' }, { id: 2, name: 'Home' }, { id: 3, name: 'Static' },];