import React from 'react';
import { useHistory } from 'react-router-dom';
import { get, has } from 'lodash';
import { ViewContainer } from 'strapi-helper-plugin';
import useDataManager from '../../hooks/useDataManager';
import LeftMenu from '../LeftMenu';

const ListPage = () => {
  /*
   *
   *   MOST OF THIS CODE NEEDS TO BE TRASHED!
   *   THE ONLY THING THAT NEEDS TO BE KEPT IS THE SEARCH GENERATED BY
   *    - handleClickEditField
   *    - handleClickAddAttributeMainData
   *    - handleClickAddAttributeNestedData
   *
   */
  const {
    initialData,
    modifiedData,
    isInContentTypeView,
    removeAttribute,
    removeComponentFromDynamicZone,
  } = useDataManager();
  const { push } = useHistory();
  const firstMainDataPath = isInContentTypeView ? 'contentType' : 'component';
  const mainDataTypeAttributesPath = [
    firstMainDataPath,
    'schema',
    'attributes',
  ];

  const attributes = get(modifiedData, mainDataTypeAttributesPath, {});
  const currentDataName = get(
    initialData,
    [firstMainDataPath, 'schema', 'name'],
    ''
  );
  const targetUid = get(modifiedData, [firstMainDataPath, 'uid']);

  const handleClickAddAttributeMainData = () => {
    const forTarget = isInContentTypeView ? 'contentType' : 'component';
    const search = `modalType=chooseAttribute&forTarget=${forTarget}&targetUid=${targetUid}&headerDisplayName=${currentDataName}`;
    push({ search });
  };
  const handleClickAddAttributeNestedData = (targetUid, headerDisplayName) => {
    const search = `modalType=chooseAttribute&forTarget=components&targetUid=${targetUid}&headerDisplayName=${headerDisplayName}`;
    push({ search });
  };
  const handleClickAddComponentToDZ = dzName => {
    const search = `modalType=addComponentToDynamicZone&forTarget=contentType&targetUid=${targetUid}&headerDisplayName=${currentDataName}&dynamicZoneTarget=${dzName}&settingType=base&step=1&actionType=edit`;
    push({ search });
  };

  // TODO just a util not sure it should be kept
  const getType = attrName => {
    const type = has(modifiedData, [
      ...mainDataTypeAttributesPath,
      attrName,
      'nature',
    ])
      ? 'relation'
      : get(
          modifiedData,
          [...mainDataTypeAttributesPath, attrName, 'type'],
          ''
        );

    return type;
  };
  const getComponentSchema = componentName => {
    return get(modifiedData, ['components', componentName], {});
  };
  const getFirstLevelComponentName = compoName => {
    return get(
      modifiedData,
      [...mainDataTypeAttributesPath, compoName, 'component'],
      ''
    );
  };
  const getComponent = attrName => {
    const componentToGet = get(
      modifiedData,
      [...mainDataTypeAttributesPath, attrName, 'component'],
      ''
    );
    const componentSchema = getComponentSchema(componentToGet);

    return componentSchema;
  };
  const handleClickEditField = (
    forTarget,
    targetUid,
    attrName,
    type,
    headerDisplayName
  ) => {
    let attributeType;

    switch (type) {
      case 'integer':
      case 'biginteger':
      case 'decimal':
      case 'float':
        attributeType = 'number';
        break;
      case 'string':
      case 'text':
        attributeType = 'text';
        break;
      case '':
        attributeType = 'relation';
        break;
      default:
        attributeType = type;
    }

    const step = type === 'component' ? '&step=2' : '';

    push({
      search: `modalType=attribute&actionType=edit&settingType=base&forTarget=${forTarget}&targetUid=${targetUid}&attributeName=${attrName}&attributeType=${attributeType}&headerDisplayName=${headerDisplayName}${step}`,
    });
  };

  // const handleClickEditComponent = compoName => {
  //   const search = `modalType=attribute&actionType=edit&settingType=base&forTarget=${forTarget}&targetUid=${targetUid}&attributeName=${attrName}&attributeType=${attributeType}&headerDisplayName=${headerDisplayName}`,
  //   push({ search });
  // }

  return (
    <ViewContainer>
      <div className="container-fluid">
        <div className="row">
          <LeftMenu />
          <div className="col-md-9">
            <button type="button" onClick={handleClickAddAttributeMainData}>
              Add field
            </button>

            {/* REALLY TEMPORARY SINCE IT DOESN T SUPPORT ANY NESTING COMPONENT*/}
            <ul>
              {Object.keys(attributes).map(attr => {
                const type = getType(attr);

                if (type === 'component') {
                  const compoData = getComponent(attr);
                  const componentSchema = get(
                    compoData,
                    ['schema', 'attributes'],
                    {}
                  );

                  return (
                    <li
                      key={attr}
                      onClick={e => {
                        e.stopPropagation();
                        handleClickEditField(
                          isInContentTypeView ? 'contentType' : 'component',
                          targetUid,
                          attr,
                          'component',
                          currentDataName
                        );
                      }}
                    >
                      <div>
                        <span>{attr}</span>
                        &nbsp;
                        <span>component</span>
                      </div>
                      <div
                        onClick={e => {
                          e.stopPropagation();
                          removeAttribute(
                            isInContentTypeView ? 'contentType' : 'component',
                            attr,
                            get(compoData, 'uid', '')
                          );
                        }}
                      >
                        REMOVE COMPO (fieldName: {attr}, compoName:{' '}
                        {get(compoData, 'uid')})
                      </div>
                      <hr />
                      <div> COMPONENT FIELDs:</div>
                      <ul>
                        {Object.keys(componentSchema).map(componentAttr => {
                          // Type of the component's attribute
                          const componentAttrType = get(
                            componentSchema,
                            [componentAttr, 'type'],
                            ''
                          );

                          if (componentAttrType === 'component') {
                            const nestedCompoNameUid = get(
                              componentSchema,
                              [componentAttr, 'component'],
                              'not found'
                            );
                            const nestedCompoData = getComponentSchema(
                              nestedCompoNameUid
                            );
                            const nestedCompoAttributes = get(
                              nestedCompoData,
                              ['schema', 'attributes'],
                              {}
                            );

                            return (
                              <li
                                key={`${attr}.${componentAttr}`}
                                onClick={e => {
                                  e.stopPropagation();
                                  console.log('edit nested compo');
                                  console.log(
                                    'nested compo attr name',
                                    componentAttr
                                  );
                                  handleClickEditField(
                                    'components',
                                    // component uid
                                    get(compoData, 'uid'),
                                    // attr name
                                    componentAttr,
                                    'component',
                                    // header display
                                    attr
                                  );
                                }}
                              >
                                <div>
                                  <span>{componentAttr}</span>
                                  &nbsp;
                                  <span>{componentAttrType}</span>
                                </div>
                                <div
                                  onClick={e => {
                                    e.stopPropagation();
                                    removeAttribute(
                                      'components',
                                      componentAttr,
                                      get(compoData, 'uid', '')
                                    );
                                  }}
                                >
                                  REMOVE NESTED COMPO FROM COMPONENT (fieldName:{' '}
                                  {componentAttr}, compoName:{' '}
                                  {get(compoData, 'uid')})
                                </div>
                                <hr />
                                <ul>
                                  {Object.keys(nestedCompoAttributes).map(
                                    nestedCompoAttribute => {
                                      const nestedComponentAttrType = get(
                                        nestedCompoAttributes,
                                        [nestedCompoAttribute, 'type'],
                                        ''
                                      );
                                      return (
                                        <li
                                          key={`${attr}.${componentAttr}.${nestedCompoAttribute}`}
                                          onClick={e => {
                                            e.stopPropagation();
                                            console.log({
                                              nestedCompoAttribute,
                                              nestedComponentAttrType,
                                              nestedCompoNameUid,
                                            });
                                            handleClickEditField(
                                              'components',
                                              nestedCompoNameUid,
                                              nestedCompoAttribute,
                                              nestedComponentAttrType,
                                              nestedCompoNameUid
                                            );
                                          }}
                                        >
                                          <div>
                                            <span>{nestedCompoAttribute}</span>
                                            &nbsp;
                                            <span>
                                              {nestedComponentAttrType}
                                            </span>
                                          </div>
                                          <div>
                                            <div
                                              onClick={e => {
                                                e.stopPropagation();
                                                removeAttribute(
                                                  'components',
                                                  nestedCompoAttribute,
                                                  nestedCompoNameUid
                                                );
                                              }}
                                            >
                                              REMOVE NESTED COMPONENT FIELD
                                              (fieldName: {nestedCompoAttribute}
                                              , compoName: {nestedCompoNameUid})
                                            </div>
                                          </div>
                                        </li>
                                      );
                                    }
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleClickAddAttributeNestedData(
                                        nestedCompoNameUid,
                                        componentAttr
                                      );
                                    }}
                                  >
                                    Add field to nested compo
                                  </button>
                                </ul>
                                <hr />
                              </li>
                            );
                          }

                          return (
                            <li
                              key={`${attr}.${componentAttr}`}
                              onClick={e => {
                                e.stopPropagation();
                                handleClickEditField(
                                  'components',
                                  getFirstLevelComponentName(attr),
                                  componentAttr,
                                  componentAttrType,
                                  attr
                                );
                              }}
                            >
                              <div>
                                <span>{componentAttr}</span>
                                &nbsp;
                                <span>{componentAttrType}</span>
                              </div>
                              <div
                                onClick={e => {
                                  e.stopPropagation();
                                  removeAttribute(
                                    'components',
                                    componentAttr,
                                    getFirstLevelComponentName(attr)
                                  );
                                }}
                              >
                                REMOVE FIELD
                              </div>
                            </li>
                          );
                        })}
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            handleClickAddAttributeNestedData(
                              get(compoData, 'uid', ''),
                              get(compoData, 'schema.name', 'ERROR')
                            );
                          }}
                        >
                          Add field to compo
                        </button>
                      </ul>
                      <hr />
                    </li>
                  );
                }

                const dzComponents = get(
                  modifiedData,
                  [...mainDataTypeAttributesPath, attr, 'components'],
                  []
                );

                return (
                  <li
                    key={attr}
                    onClick={() =>
                      handleClickEditField(
                        isInContentTypeView ? 'contentType' : 'component',
                        targetUid,
                        attr,
                        type,
                        currentDataName
                      )
                    }
                  >
                    <div>
                      <span>{attr}</span>
                      &nbsp;
                      <span>{type}</span>
                      {type === 'dynamiczone' && (
                        <>
                          <div>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleClickAddComponentToDZ(attr);
                              }}
                              type="button"
                            >
                              ADD COMPO TO DZ
                            </button>
                          </div>
                          <div style={{ display: 'flex' }}>
                            {dzComponents.map((compo, index) => {
                              return (
                                <div key={compo} style={{ marginRight: 20 }}>
                                  {compo}&nbsp;
                                  <span
                                    onClick={e => {
                                      e.stopPropagation();
                                      removeComponentFromDynamicZone(
                                        attr,
                                        index
                                      );
                                    }}
                                  >
                                    X
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>

                    <div
                      onClick={e => {
                        e.stopPropagation();
                        removeAttribute(
                          isInContentTypeView ? 'contentType' : 'component',
                          attr
                        );
                      }}
                    >
                      REMOVE FIELD
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </ViewContainer>
  );
};

export default ListPage;
