module.exports = (sequelize,Types) => {
    const OpenCourse = sequelize.define('OpenCourse',{
        name:Types.STRING(50),
        description:Types.STRING(100),
        time:Types.DATE,
        count:Types.INTEGER,
        notBegin:Types.INTEGER
    },{
        tableName:'open_course',
        timestamps:false
    });

    OpenCourse.sync();
    return OpenCourse;
}